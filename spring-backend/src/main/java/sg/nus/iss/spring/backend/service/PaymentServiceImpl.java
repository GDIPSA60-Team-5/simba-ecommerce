package sg.nus.iss.spring.backend.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentIntentRetrieveParams;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.dto.OrderDetailsDTO;
import sg.nus.iss.spring.backend.interfacemethods.PaymentService;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.repository.DeliveryTypeRepository;


/* Written by Aung Myin Moe */
@Service
public class PaymentServiceImpl implements PaymentService {
	@Value("${stripe.secret.key}")
    private String stripeSecretKey;
	
	@Autowired
	private DeliveryTypeRepository deliRepo;
	
	public Map<String, Object> createStripeCheckoutSession(List<CartItem> cartItems, HttpSession session) 
			throws StripeException, Exception {
		
		Stripe.apiKey = stripeSecretKey; // move to config ideally

	    BigDecimal subTotal = BigDecimal.ZERO;
	    BigDecimal deliFee = BigDecimal.ZERO;
	    BigDecimal GST_RATE = new BigDecimal("0.09"); // 9% GST
	    
	    // get delivery type from session object
	    OrderDetailsDTO orderDetails = (OrderDetailsDTO) session.getAttribute("order_data");
	    Optional<DeliveryType> deliType = deliRepo.findByName(orderDetails.getDeliveryType());
	    if (deliType.isPresent()) {
	    	deliFee = BigDecimal.valueOf(deliType.get().getFee());
	    } else {
	    	throw new Exception("Invalid DeliveryType");
	    }

	    for (CartItem item : cartItems) {
	    	BigDecimal unitPrice = BigDecimal.valueOf(item.getProduct().getPrice());
	        BigDecimal quantity = BigDecimal.valueOf(item.getQuantity());
	        subTotal = subTotal.add(unitPrice.multiply(quantity).setScale(2, RoundingMode.HALF_UP));
	    }
	    // Compute GST separately from subtotal
	    BigDecimal gstAmount = subTotal.multiply(GST_RATE).setScale(2, RoundingMode.HALF_UP);

	    // Final total
	    BigDecimal grandTotal = subTotal.add(gstAmount).add(deliFee);

	    // Convert to cents for Stripe
	    long amountInCents = grandTotal.multiply(BigDecimal.valueOf(100)).longValue();

	    PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
	        .setAmount(amountInCents)
	        .setCurrency("sgd")
	        .setAutomaticPaymentMethods(
	            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
	        )
	        .build();

	    PaymentIntent intent = PaymentIntent.create(params);

	    Map<String, Object> response = new HashMap<>();
	    String clientSecret = intent.getClientSecret();
	    session.setAttribute("stripe_session_id", clientSecret);
	    response.put("clientSecret", clientSecret);
	    return response;
	}
	
	public String getPaymentType(String paymentIntentId) throws StripeException {
		/* get the payment method from stripe api
		 * 1. retrieve the session
		 * 2. get the payment intent ID
		 * 3. retrieve the payment intent with payment method details
		 * 4. get the payment method type
		 */
	    
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

