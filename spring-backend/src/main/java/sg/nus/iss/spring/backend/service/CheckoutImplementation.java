package sg.nus.iss.spring.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import sg.nus.iss.spring.backend.interfacemethods.CheckoutInterface;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.repository.CartRepository;

@Service
@Transactional
public class CheckoutImplementation implements CheckoutInterface {
	@Autowired
	CartRepository cartRepo;
	
	@Override
	public List<CartItem> listCartItems(int userId) {
		return cartRepo.findAllByUser_Id(userId);
	}
	
	@Override
	public CartItem updateCartOrderQty(CartItem cartItem) {
		return cartRepo.save(cartItem);
	}
	
	@Override
	public void removeCart(int userId) {
		cartRepo.deleteAllByUser_Id(userId);
	}
}
