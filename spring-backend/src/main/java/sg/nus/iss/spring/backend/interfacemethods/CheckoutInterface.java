package sg.nus.iss.spring.backend.interfacemethods;

import java.util.List;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.Order;

public interface CheckoutInterface {
	List<CartItem> listCartItems(int userId);
	CartItem updateCartOrderQty(CartItem cartItem);
	void removeCart(int userId);
	Order saveOrderRecord(HttpSession session, List<CartItem> cartItems) throws Exception;
}
