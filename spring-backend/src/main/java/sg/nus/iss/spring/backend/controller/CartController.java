package sg.nus.iss.spring.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.stripe.exception.StripeException;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import sg.nus.iss.spring.backend.dto.CheckoutRequestDTO;
import sg.nus.iss.spring.backend.dto.CheckoutResponseDTO;
import sg.nus.iss.spring.backend.interfacemethods.CartService;
import sg.nus.iss.spring.backend.interfacemethods.PaymentService;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.repository.DeliveryTypeRepository;
import sg.nus.iss.spring.backend.repository.ProductRepository;
import sg.nus.iss.spring.backend.util.SessionUtils;


/* Written by Aung Myin Moe */

@RestController
@RequestMapping("/api")
public class CartController {
	@Autowired
	private CartService cartService;
	
	@Autowired
	private PaymentService paymentService;
	
	@Autowired
	private ProductRepository pRepo;
	
	@Autowired 
	private DeliveryTypeRepository deliveryRepo;
	
	private static final int DEFAULT_CART_QUANTITY = 1;

	// get a list of products in the cart
	@Transactional
	@GetMapping("/cart")
	public List<CartItem> viewCart(HttpSession session) {
		return cartService.listCartItems(SessionUtils.getUserFromSession(session));
	}
	
	// adjust the quantity of products in the cart
	@PutMapping("/cart/update-quantity")
	public ResponseEntity<?> reviseOrderQty(@RequestBody CartItem cartItem) {
		// validate product quantity with the stock quantity
		Product product = cartItem.getProduct();
		Product latestProduct = pRepo.findById(product.getId()).orElseThrow(() -> new RuntimeException("Product not found"));
		
		if (cartItem.getQuantity() < 1) {
	        return ResponseEntity.badRequest().body("Quantity must be at least 1");
	    }
		if (cartItem.getQuantity() > latestProduct.getQuantity()) {
			return ResponseEntity.badRequest().body("Not enough stock available");
		}
		
		// ...
		return ResponseEntity.ok(cartService.updateCartOrderQty(cartItem));
	}
	
	// click the submit order button to go to payment gateway page
	@PostMapping("/cart/submit")
	public ResponseEntity<?> formPayment(@Valid @RequestBody CheckoutRequestDTO checkoutRequestDTO, BindingResult result, HttpSession session)
			throws StripeException, Exception {
		/*
		 * To do
		 * validate input data deliType and shippingAddress
		 * validate submitting no cart item to stripe
		 */
		Map<String, String> errors = new HashMap<>();
		 if (result.hasErrors()) {
		        result.getFieldErrors().forEach(err ->
		            errors.put(err.getField(), err.getDefaultMessage())
		        );
		    }

		Integer deliveryTypeId = checkoutRequestDTO.getDeliveryTypeId();
		 if(deliveryTypeId != null) {
			 DeliveryType selectedType = deliveryRepo.findById(deliveryTypeId).orElse(null);
	        if (selectedType == null) errors.put("deliveryType", "Invalid delivery type selected");
		 }

		List<CartItem> cartItems = cartService.listCartItems(SessionUtils.getUserFromSession(session));

		if (cartItems.isEmpty()) {
			errors.put("cart","Cart cannot be empty");
		}
		
		if (!errors.isEmpty()) {
			return ResponseEntity.badRequest().body(errors);
		}

		// save form input data into session
		session.setAttribute("order_data", checkoutRequestDTO);

		CheckoutResponseDTO response = paymentService.createStripeCheckoutSession(cartItems, session);
		return ResponseEntity.ok(response);
	}
	
	// draft implementation of payment success api
	// ...
	@GetMapping("/payment/success")
	public String paymentSuccess(@RequestParam("payment_intent") String paymentIntentId, HttpSession session) throws Exception {
		/*
		 * upon successful payment, save the order details in the order table
		 * to save order details, we will collect required attributes and save it to session
		 */
		
		// get cart items from session
		List<CartItem> cartItems = cartService.listCartItems(SessionUtils.getUserFromSession(session));

		// get stripe session id from session and find payment type from stripe server
		// String stripeSessionId = (String) session.getAttribute("stripe_session_id");
		String paymentType = paymentService.getPaymentType(paymentIntentId);
	    
	    // save payment type in session
	    session.setAttribute("payment_type", paymentType);
		
	    // save the order record
	    cartService.saveOrderRecord(session, cartItems);

	    
		// delete the cart after saving order
	    User user = (User) session.getAttribute("authenticated_user");
		cartService.removeCart(user);
		
		// send payment successful email to the customer
		// ... to implement if we have time ...
		return "Payment Successful!";
	}
	
	// draft implementation of payment cancel api
	// ...
	@GetMapping("/payment/cancel")
	public String paymentCancel() {
		return "Payment Cancelled!";
	}
		
	// cancel order in cart page
	@DeleteMapping("/cart/delete")
	public void deleteCart(HttpSession session) {
		cartService.removeCart(SessionUtils.getUserFromSession(session));
	}

	//Done by Haziq:
	@PostMapping("/cart/add")
	public ResponseEntity<String> addToCart(HttpSession session, @RequestParam int productId){
		User user = SessionUtils.getUserFromSession(session);
		cartService.addToCart(user, productId, DEFAULT_CART_QUANTITY);
		return ResponseEntity.ok("Product added to cart");
	}

	@DeleteMapping("/cart/remove/{productId}")
	public ResponseEntity<String> removeProductFromCart(HttpSession session, @PathVariable int productId){
		cartService.removeProductFromCart(SessionUtils.getUserFromSession(session), productId);
		return ResponseEntity.ok("Product removed from cart");
	}

}

