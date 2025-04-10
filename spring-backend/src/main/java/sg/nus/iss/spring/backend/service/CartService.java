package sg.nus.iss.spring.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sg.nus.iss.spring.backend.repository.CartRepository;
import sg.nus.iss.spring.backend.repository.ProductRepository;
import sg.nus.iss.spring.backend.model.Cart;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.Product;

@Service
public class CartService {
	@Autowired
	private CartRepository cartRepo;
	
	@Autowired 
	private ProductRepository productRepo;
	
	
	@Transactional
	public void addToCart(int cartId, int productId, int quantity) {
		Product product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
		
		Cart cart = cartRepo.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));

		if (product.getinStockQty() < quantity) {
			throw new RuntimeException("Not enough stock");
		} else {
			CartItem newItem = new CartItem();
			newItem.setProduct(product);
			newItem.setQuantity(quantity);
			cart.getItems().add(newItem);
		}
		
		productRepo.save(product);
		cartRepo.save(cart);
	}

}
