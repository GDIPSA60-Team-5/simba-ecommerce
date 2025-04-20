package sg.nus.iss.spring.backend.interfacemethods;

import java.util.List;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.model.User;

public interface CartService {
	List<CartItem> listCartItems(User user);
	void addToCart(User user, int productId, int quantity);
	CartItem updateCartOrderQty(CartItem cartItem);
	void removeProductFromCart(User user, int productId);
	void removeCart(User user);

	Order saveOrderRecord(HttpSession session, List<CartItem> cartItems) throws Exception;
}

