package sg.nus.iss.spring.backend.stripe.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/payment")
public class StripeController {
	@PostMapping("/create-checkout-session")
	public Map<String, Object> createCheckoutSession() throws StripeException {
		String BASE_URL = "http://localhost:8080/api/payment";
		SessionCreateParams params = SessionCreateParams.builder()
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.PAYNOW)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl(BASE_URL + "/success")
				.setCancelUrl(BASE_URL + "/cancel")
				.setCurrency("sgd")
				.addLineItem(
						SessionCreateParams.LineItem.builder()		
							.setPriceData(
									SessionCreateParams.LineItem.PriceData.builder()
										.setCurrency("sgd")
										.setUnitAmount(100L)
										.setProductData(
											SessionCreateParams.LineItem.PriceData.ProductData.builder()
												.setName("Test Product")
												.build()
										)
										.build()
							).setQuantity(1L)
							.build()		
				)
				.build();
		Session session = Session.create(params);
		Map<String, Object> result = new HashMap<>();
		result.put("sessionId", session.getId());
		return ResponseEntity.ok(result).getBody();	
	}
	
	@GetMapping("/success")
	public String paymentSuccess() {
		return "Payment Successful!";
	}
	
	@GetMapping("/cancel")
	public String paymentCancel() {
		return "Payment Cancelled!";
	}
}
