package sg.nus.iss.spring.backend.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentRetrieveParams;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.interfacemethods.PaymentService;
import sg.nus.iss.spring.backend.model.CartItem;


/* Written by Aung Myin Moe */
@Service
public class PaymentServiceImpl implements PaymentService {
	public Map<String, Object> createStripeCheckoutSession(List<CartItem> cartItems, HttpSession session) 
			throws StripeException {
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
									.multiply(BigDecimal.valueOf(100)).longValue())
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
		
		// save stripe session id in backend session id
		String stripeSessionId = stripeCheckoutSession.getId();
		session.setAttribute("stripe_session_id", stripeSessionId);
		
		// send stripe payment gateway url to frontend
		Map<String, Object> result = new HashMap<>();
		result.put("sessionId", stripeSessionId);
		result.put("checkoutUrl", stripeCheckoutSession.getUrl());
		return ResponseEntity.ok(result).getBody();	
	}
	
	public String getPaymentType(String stripeSessionId) throws StripeException {
		/* get the payment method from stripe api
		 * 1. retrieve the session
		 * 2. get the payment intent ID
		 * 3. retrieve the payment intent with payment method details
		 * 4. get the payment method type
		 */
		Session stripeCheckoutSession = Session.retrieve(stripeSessionId);
	    String paymentIntentId = stripeCheckoutSession.getPaymentIntent();
	    
	    PaymentIntent paymentIntent = PaymentIntent.retrieve(
	        paymentIntentId,
	        PaymentIntentRetrieveParams.builder()
	            .addExpand("payment_method")  // important: expand this!
	            .build(),
	        null
	    );
	    
	    PaymentMethod paymentMethod = paymentIntent.getPaymentMethodObject();
	    return paymentMethod.getType(); // "card", "paynow", etc.
	}
}

