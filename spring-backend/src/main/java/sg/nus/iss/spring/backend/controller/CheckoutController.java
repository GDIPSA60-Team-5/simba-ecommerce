package sg.nus.iss.spring.backend.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentRetrieveParams;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.interfacemethods.CheckoutInterface;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.User;


/* Written by Aung Myin Moe */
@RestController
@RequestMapping("/api")
public class CheckoutController {
	@Autowired
	private CheckoutInterface checkoutInterface;
	
	// a lot of methods in this controller try to get a list of cart items
	// create a method to reduce duplication
	// ...
	private List<CartItem> getCartItems(HttpSession session) {
		User user = (User) session.getAttribute("authenticated_user");
		int userId = user.getId();
		return checkoutInterface.listCartItems(userId);
	}
	
	// get a list of products in the cart
	@GetMapping("/cart")
	public List<CartItem> viewCart(HttpSession session) {
		return getCartItems(session);
	}
	
	// adjust the quantity of products in the cart
	@PutMapping("/cart/update-quantity")
	public CartItem reviseOrderQty(@RequestBody CartItem cartItem) {
		// validate product quantity with the stock quantity
		// ...
		return checkoutInterface.updateCartOrderQty(cartItem);
	}
	
	// click the submit order button to go to payment gateway page
	@PostMapping("/cart/submit-order")
	public Map<String, Object> formPayment(@RequestParam String deliType, @RequestParam String shippingAddress, HttpSession session) 
		throws StripeException {
		// validate input data deliType and shippingAddress
		// ...
		// save form input data into session
		// remove the session data from previous order
		session.removeAttribute("order_data");
		Map<String, Object> orderData = new HashMap<>();
		orderData.put("delivery_type", deliType);
		orderData.put("shipping_address", shippingAddress);
		
		// get the cart items of the user
		List<CartItem> cartItems = getCartItems(session);
		
		// implement Stripe payment gateway for customer to make payment
		String BASE_URL = "http://localhost:8080/api/payment";
		SessionCreateParams.Builder builder = SessionCreateParams.builder()
			.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
			.addPaymentMethodType(SessionCreateParams.PaymentMethodType.PAYNOW)
			.setMode(SessionCreateParams.Mode.PAYMENT)
			.setSuccessUrl(BASE_URL + "/success")
			.setCancelUrl(BASE_URL + "/cancel");
			
			// loop over cart items to add each as a line item
			for (CartItem item : cartItems) {
				builder.addLineItem(
					SessionCreateParams.LineItem.builder()	
						.setQuantity((long) item.getQuantity())
						.setPriceData(
							SessionCreateParams.LineItem.PriceData.builder()
								.setCurrency("sgd")
								.setUnitAmount(BigDecimal.valueOf(item.getProduct().getPrice())
									.multiply(BigDecimal.valueOf(100)).longValue()) // Stripe needs amount in cents in long data type
								.setProductData(
									SessionCreateParams.LineItem.PriceData.ProductData.builder()
										.setName(item.getProduct().getName())
										.build()
								)
								.build()
						)
						.build()		
				);
			}
			
		// build the params
		SessionCreateParams params = builder.build();
		Session stripeCheckoutSession = Session.create(params);
		Map<String, Object> result = new HashMap<>();
		result.put("sessionId", stripeCheckoutSession.getId());
		return ResponseEntity.ok(result).getBody();	
	}
	
	// draft implementation of payment success api
	// ...
	@GetMapping("/payment/success")
	public String paymentSuccess(HttpSession session, @RequestParam("session_id") String sessionId) throws Exception {
		// upon successful payment, save the order details in the order table
		// ...
		List<CartItem> cartItems = getCartItems(session);
		
		/* get the payment method from stripe api
		 * 1. retrieve the session
		 * 2. get the payment intent ID
		 * 3. retrieve the payment intent with payment method details
		 * 4. get the payment method type
		 */
	    Session stripeCheckoutSession = Session.retrieve(sessionId);
	    String paymentIntentId = stripeCheckoutSession.getPaymentIntent();
	    
	    PaymentIntent paymentIntent = PaymentIntent.retrieve(
	        paymentIntentId,
	        PaymentIntentRetrieveParams.builder()
	            .addExpand("payment_method")  // important: expand this!
	            .build(),
	        null
	    );
	    
	    PaymentMethod paymentMethod = paymentIntent.getPaymentMethodObject();
	    String paymentType = paymentMethod.getType(); // "card", "paynow", etc.
	    
	    // get current date time and save it to session
	    @SuppressWarnings("unchecked")
		Map<String, Object> orderData = (Map<String, Object>) session.getAttribute("order_data");
	    orderData.put("date_time", LocalDateTime.now());
	    orderData.put("payment_type", paymentType);
		
	    // save the order record
	    checkoutInterface.saveOrderRecord(session, cartItems);
	    
		// delete the cart after saving order
	    User user = (User) session.getAttribute("authenticated_user");
		int userId = user.getId();
		checkoutInterface.removeCart(userId);
		
		// send payment successful email to the customer
		return "Payment Successful!";
	}
	
	// draft implementation of payment cancel api
	// ...
	@GetMapping("/payment/cancel")
	public String paymentCancel() {
		return "Payment Cancelled!";
	}
		
	// cancel order in cart page
	@DeleteMapping("/cancel-order")
	public void cancelOrder(HttpSession session) {
		User user = (User) session.getAttribute("authenticated_user");
		int userId = user.getId();
		checkoutInterface.removeCart(userId);
	}
}
