package sg.nus.iss.spring.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import sg.nus.iss.spring.backend.dto.OrderDetailsDTO;
import sg.nus.iss.spring.backend.interfacemethods.CartService;
import sg.nus.iss.spring.backend.interfacemethods.DeliveryService;
import sg.nus.iss.spring.backend.interfacemethods.PaymentService;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.repository.DeliveryTypeRepository;
import sg.nus.iss.spring.backend.repository.ProductRepository;


/* Written by Aung Myin Moe */

@RestController
@RequestMapping("/api")
public class CartController {
	@Autowired
	private CartService cartService;
	
	@Autowired
	private PaymentService paymentService;
	
	@Autowired
	private DeliveryService deliService;
	
	@Autowired 
	private ProductRepository pRepo;
	
	@Autowired 
	private DeliveryTypeRepository deliveryRepo;
	
	private static final int DEFAULT_CART_QUANTITY = 1;
	
	// create a user object calling method to reduce duplication
	private User getUser(HttpSession session) {
		User user = (User) session.getAttribute("authenticated_user");
		return user;
	}
	
	// get a list of products in the cart
	@GetMapping("/cart")
	public List<CartItem> viewCart(HttpSession session) {
		return cartService.listCartItems(getUser(session));
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
	public ResponseEntity<?> formPayment(@RequestBody OrderDetailsDTO orderDetailsDTO, HttpSession session) 
			throws StripeException {
		/*
		 * To do
		 * validate input data deliType and shippingAddress
		 * validate submitting no cart item to stripe
		 */
		String deliveryType = orderDetailsDTO.getDeliveryType();
		if (deliveryType == null || deliveryType.trim().isEmpty()) {
			return ResponseEntity.badRequest().body("Delivery type required");
		}
		
		DeliveryType selectedType = deliveryRepo.findByName(deliveryType).orElse(null);
		if (selectedType ==null) {
			return ResponseEntity.badRequest().body("Invalid delivery type selected");
		}
		
		String address = orderDetailsDTO.getShippingAddress();
		if (address ==null || address.trim().isEmpty()) {
			return ResponseEntity.badRequest().body("Shipping address cannot be empty");
		}
		
		// save form input data into session
		session.setAttribute("order_data", orderDetailsDTO);
		
		// get the cart items of the user
		List<CartItem> cartItems = cartService.listCartItems(getUser(session));
			//validation for empty cart
		if (cartItems.isEmpty()) {
			return ResponseEntity.badRequest().body("Cart cannot be empty");
		}
		
		Map<String, Object>response = paymentService.createStripeCheckoutSession(cartItems, session);
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
		List<CartItem> cartItems = cartService.listCartItems(getUser(session));
		
		// get stripe session id from session and find payment type from stripe server
		// String stripeSessionId = (String) session.getAttribute("stripe_session_id");
		String paymentType = paymentService.getPaymentType(paymentIntentId);
	    
	    // save payment type in session
	    session.setAttribute("payment_type", paymentType);
		
	    // save the order record
	    cartService.saveOrderRecord(session, cartItems);
	    
	    /*
	     * To do
	     * reduce the stock quantity in product table
	     */
	    
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
	@DeleteMapping("/delete-cart")
	public void deleteCart(HttpSession session) {
		cartService.removeCart(getUser(session));
	}
	
	// get delivery type
	@GetMapping("/deli-type")
	public List<DeliveryType> getDeliType() {
		return deliService.getDeliType();
	}
		
	//Done by Haziq:
	@PostMapping("/cart/add")
	public ResponseEntity<String> addToCart(HttpSession session, @RequestParam int productId){
		User user = getUser(session);
		if (user==null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must be logged in to add to cart.");
		}
		System.out.println("Add to Cart. ProductId=" + productId + ", quantity=" + DEFAULT_CART_QUANTITY);
		cartService.addToCart(user, productId, DEFAULT_CART_QUANTITY);
		return ResponseEntity.ok("Product added to cart");
	}

	@DeleteMapping("/cart/remove/{productId}")
	public ResponseEntity<String> removeProductFromCart(HttpSession session, @PathVariable int productId){
		cartService.removeProductFromCart(getUser(session), productId);
		return ResponseEntity.ok("Product removed from cart");
	}

}

