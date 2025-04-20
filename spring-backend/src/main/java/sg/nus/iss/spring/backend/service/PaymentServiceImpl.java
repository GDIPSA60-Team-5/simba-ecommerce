package sg.nus.iss.spring.backend.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

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
import sg.nus.iss.spring.backend.dto.CheckoutRequestDTO;
import sg.nus.iss.spring.backend.dto.CheckoutResponseDTO;
import sg.nus.iss.spring.backend.interfacemethods.PaymentService;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.repository.DeliveryTypeRepository;

/* Written By Aung Myin Moe */
@Service
public class PaymentServiceImpl implements PaymentService {

	private final DeliveryTypeRepository deliveryTypeRepository;
	private final String stripeSecretKey;
	private static final BigDecimal GST_RATE = new BigDecimal("0.09");

	@Autowired
	public PaymentServiceImpl(
			DeliveryTypeRepository deliveryTypeRepository,
			@Value("${stripe.secret.key}") String stripeSecretKey
	) {
		this.deliveryTypeRepository = deliveryTypeRepository;
		this.stripeSecretKey = stripeSecretKey;
	}

	@Override
	public CheckoutResponseDTO createStripeCheckoutSession(List<CartItem> cartItems, HttpSession session)
			throws StripeException, Exception {

		Stripe.apiKey = stripeSecretKey;

		CheckoutRequestDTO checkoutRequest = getCheckoutDataFromSession(session);
		DeliveryType deliveryType = fetchDeliveryType(checkoutRequest.getDeliveryTypeId());

		BigDecimal subTotal = calculateSubtotal(cartItems);
		BigDecimal gstAmount = calculateGST(subTotal);
		BigDecimal grandTotal = subTotal.add(gstAmount).add(BigDecimal.valueOf(deliveryType.getFee()));

		long amountInCents = grandTotal.multiply(BigDecimal.valueOf(100)).longValue();
		PaymentIntent intent = createStripePaymentIntent(amountInCents);

		String clientSecret = intent.getClientSecret();
		session.setAttribute("stripe_session_id", clientSecret);

		return new CheckoutResponseDTO(clientSecret);
	}

	@Override
	public String getPaymentType(String paymentIntentId) throws StripeException {
		PaymentIntent intent = PaymentIntent.retrieve(
				paymentIntentId,
				PaymentIntentRetrieveParams.builder().addExpand("payment_method").build(),
				null);
		PaymentMethod method = intent.getPaymentMethodObject();
		return method.getType();
	}

	private CheckoutRequestDTO getCheckoutDataFromSession(HttpSession session) throws Exception {
		CheckoutRequestDTO data = (CheckoutRequestDTO) session.getAttribute("order_data");
		if (data == null) {
			throw new Exception("Missing checkout data in session");
		}
		return data;
	}

	private DeliveryType fetchDeliveryType(Integer deliveryTypeId) throws Exception {
		return deliveryTypeRepository.findById(deliveryTypeId)
				.orElseThrow(() -> new Exception("Invalid DeliveryType"));
	}

	private BigDecimal calculateSubtotal(List<CartItem> cartItems) {
		return cartItems.stream()
				.map(item -> BigDecimal.valueOf(item.getProduct().getPrice())
						.multiply(BigDecimal.valueOf(item.getQuantity())))
				.map(amount -> amount.setScale(2, RoundingMode.HALF_UP))
				.reduce(BigDecimal.ZERO, BigDecimal::add);
	}

	private BigDecimal calculateGST(BigDecimal subtotal) {
		return subtotal.multiply(GST_RATE).setScale(2, RoundingMode.HALF_UP);
	}

	private PaymentIntent createStripePaymentIntent(long amountInCents) throws StripeException {
		PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
				.setAmount(amountInCents)
				.setCurrency("sgd")
				.setAutomaticPaymentMethods(
						PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build())
				.build();
		return PaymentIntent.create(params);
	}
}
