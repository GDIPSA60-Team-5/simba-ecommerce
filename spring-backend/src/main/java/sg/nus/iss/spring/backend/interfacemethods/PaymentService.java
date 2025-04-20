package sg.nus.iss.spring.backend.interfacemethods;

import java.util.List;
import java.util.Map;

import com.stripe.exception.StripeException;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.dto.CheckoutResponseDTO;
import sg.nus.iss.spring.backend.model.CartItem;

public interface PaymentService {
	CheckoutResponseDTO createStripeCheckoutSession(List<CartItem> cartItems, HttpSession session) throws StripeException, Exception;
	String getPaymentType(String stripeSessionId) throws StripeException;
}
