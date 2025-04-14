package sg.nus.iss.spring.backend;

import java.text.SimpleDateFormat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import sg.nus.iss.spring.backend.interfacemethods.CartService;
import sg.nus.iss.spring.backend.model.Cart;
import sg.nus.iss.spring.backend.model.Category;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.model.Role;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.repository.CartItemRepository;
import sg.nus.iss.spring.backend.repository.CartRepository;
import sg.nus.iss.spring.backend.repository.CategoryRepository;
import sg.nus.iss.spring.backend.repository.ProductRepository;
import sg.nus.iss.spring.backend.repository.UserRepository;

@SpringBootTest
public class AddReduceRemoveFromCartTests {
	
	@Autowired
	private CartItemRepository cartItemRepo;
	
	@Autowired
	private CartRepository cartRepo;
	
	@Autowired
	private ProductRepository prodRepo;
	
	@Autowired
	private CategoryRepository catRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CartService cartService;
	
	
	@Test
	public void testAddReduceRemoveFromCart() throws Exception {
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			
			Category fiction = new Category("Fiction");
			Category nonFiction = new Category("Non-Fiction");
			catRepo.save(fiction);
			catRepo.save(nonFiction);
			
			
			Product book1 = new Product("Naruto", "Ninjas", fiction, "Shonen", 2.90f, 9, "www.com", 4.5f);
			Product book2 = new Product("One Piece", "Pirates", nonFiction, "Shonen", 3.90f, 9, "www.com", 5f);
			Product book3 = new Product("Demon slayer", "michaeljackson", nonFiction, "Shonen", 3.40f, 9, "www.com", 2.5f);
			
			prodRepo.save(book1);
			prodRepo.save(book2);
			prodRepo.save(book3);
			
			User james = new User("James", "Harden", "JamesH", "***", "91234567", "jamesH@gmail.com", "23 lane", sdf.parse("2/1/2000"), Role.USER);
			userRepo.save(james);
			User simon = new User("Simon", "Lee", "SimonL", "***", "912444567", "simonL@gmail.com", "212 lane", sdf.parse("23/11/2010"), Role.USER);
			userRepo.save(simon);
			
			Cart jamesCart = new Cart();
			jamesCart.setUser(james);
			cartRepo.save(jamesCart);
			
			Cart simonCart = new Cart();
			simonCart.setUser(simon);
			cartRepo.save(simonCart);
			
			//adding to cart
			cartService.addToCart(jamesCart.getId(), book1.getId(), 3);
			cartService.addToCart(jamesCart.getId(), book2.getId(), 2);
			cartService.addToCart(simonCart.getId(), book1.getId(), 3);
			cartService.addToCart(simonCart.getId(), book2.getId(), 5);
			
			//reduce from cart
			cartService.reduceProductQuantity(jamesCart.getId(), book1.getId());
			
			//remove product totally from cart
			cartService.removeProductFromCart(simonCart.getId(), book2.getId());
			
			
	};	
		
	
		
		
}
