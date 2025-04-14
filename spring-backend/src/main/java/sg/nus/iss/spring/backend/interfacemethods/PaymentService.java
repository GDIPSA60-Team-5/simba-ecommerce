package sg.nus.iss.spring.backend.interfacemethods;

import java.util.List;
import java.util.Map;

import com.stripe.exception.StripeException;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.model.CartItem;

public interface PaymentService {
	Map<String, Object> createStripeCheckoutSession(List<CartItem> cartItems, HttpSession session) throws StripeException;
	String getPaymentType(String stripeSessionId) throws StripeException;
}
