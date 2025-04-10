package sg.nus.iss.spring.backend.interfacemethods;

import java.util.List;

import sg.nus.iss.spring.backend.model.CartItem;

public interface CheckoutInterface {
	List<CartItem> listCartItems(int userId);
	CartItem updateCartOrderQty(CartItem cartItem);
	void removeCart(int userId);
}
