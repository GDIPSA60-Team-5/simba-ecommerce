package sg.nus.iss.spring.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.interfacemethods.CheckoutInterface;
import sg.nus.iss.spring.backend.model.CartItem;


@RestController
public class CheckoutControllerRest {
	@Autowired
	private CheckoutInterface checkoutInterface;
	
	private final String MY_DOMAIN = "http://localhost:8080";
	static {
		Stripe.apiKey = "sk_test_51RBtJ5GBEBEiOSMSwCNG9SWurkv6aRMDKx75WJ25okSE3sRE7NJQJcScQqjd82l5v4sxFF2XrAn1iW9hUPJPULw6009memfSib";
	}
		
	// go to the browse-product page
	@GetMapping("/")
	public String browseProduct() {
		return "browse-product";
	}
	
	// clicking the cart button to show the user cart
	@GetMapping("/cart/{userId}")
	public List<CartItem> viewCart(@PathVariable int userId) {
		
		/* // code for @Controller
		int user_id = (int) session.getAttribute("user_id");
		List<CartItem> cartItems = checkoutInterface.listCartItems(1);
		if (!cartItem.isEmpty()) {
			model.addAttribute("cart", CartItem);
		} */
		
		// code for Restful API
		List<CartItem> cartItems = checkoutInterface.listCartItems(userId);
		return cartItems;
	}
	
	// adjust the product quantity in the cart
	@PutMapping("/cart/update-quantity")
	public CartItem reviseOrderQty(@RequestBody CartItem cartItem) {
		// implement product stock quantity validation
		// update cart order quantity
		return checkoutInterface.updateCartOrderQty(cartItem);
	}
	
	// click the submit order button to go to payment gateway page
	@PostMapping("/cart/submit-order")
	public Map<String, String> formPayment(@RequestParam String deliType, @RequestParam String shippingAddress, HttpSession session) {
		// save form input data into session first
		session.setAttribute("delivery_type", deliType);
		session.setAttribute("shipping_address", shippingAddress);
		
		// return response object for RestfulAPI call
		Map<String, String> response = new HashMap<>();
		response.put("delivery_type", deliType);
		response.put("shipping_address", shippingAddress);
		
		return response;
		
		// if change to controller annotation, need to return html page
		// return "make-payment";
	}
	
	// implement the payment gateway method by embedding Stripe	
	// POST: Create Checkout Session
    @PostMapping("/cart/create-checkout-session")
    public Map<String, String> createCheckoutSession() throws Exception {
        SessionCreateParams params = SessionCreateParams.builder()
            .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setReturnUrl(MY_DOMAIN + "/cart/return.html?session_id={CHECKOUT_SESSION_ID}")
            .addLineItem(
                SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPrice("{{PRICE_ID}}") // Replace with your actual Price ID
                    .build())
            .build();

        Session session = Session.create(params);

        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", session.getRawJsonObject()
                                             .getAsJsonPrimitive("client_secret")
                                             .getAsString());
        return response;
    }

    // GET: Retrieve session status
    @GetMapping("/session-status")
    public Map<String, String> getSessionStatus(@RequestParam("session_id") String sessionId) throws Exception {
        Session session = Session.retrieve(sessionId);

        Map<String, String> response = new HashMap<>();
        response.put("status", session.getRawJsonObject()
                                      .getAsJsonPrimitive("status")
                                      .getAsString());

        response.put("customer_email", session.getRawJsonObject()
                                              .getAsJsonObject("customer_details")
                                              .getAsJsonPrimitive("email")
                                              .getAsString());

        return response;
    }
	
	// cancel order in cart page
	@DeleteMapping("/cart/cancel-order/{userId}")
	public void cancelOrder(@PathVariable int userId) {
		// int userId = (int) session.getAttribute("user_id");
		checkoutInterface.removeCart(userId);
	}
	
}
