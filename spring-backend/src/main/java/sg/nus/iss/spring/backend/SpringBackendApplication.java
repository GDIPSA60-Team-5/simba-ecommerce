package sg.nus.iss.spring.backend;

import java.text.SimpleDateFormat;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.model.Role;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.Category;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.repository.CartRepository;
import sg.nus.iss.spring.backend.repository.CategoryRepository;
import sg.nus.iss.spring.backend.repository.DeliveryTypeRepository;
import sg.nus.iss.spring.backend.repository.ProductRepository;
import sg.nus.iss.spring.backend.repository.UserRepository;

@SpringBootApplication
public class SpringBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBackendApplication.class, args);
    }
    
    @Bean
	CommandLineRunner loadData(CartRepository cartRepo, UserRepository userRepo, ProductRepository productRepo, DeliveryTypeRepository deliTypeRepo,
			CategoryRepository categoryRepo) {
		return(args) -> {
			// user dummy data
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	        User user_1 = userRepo.save(new User(
	                "Alice", "Tan", "alice", "pass123", "91234567", "alice@example.com",
	                "123 Orchard Rd", sdf.parse("1990-01-01"), Role.USER
	        ));

	        User user_2 = userRepo.save(new User(
	                "Bob", "Lee", "bob", "pass123", "98765432", "bob@example.com",
	                "456 Clementi Rd", sdf.parse("1985-05-15"), Role.ADMIN
	        ));

	        User user_3 = userRepo.save(new User(
	                "Carol", "Lim", "carol", "pass123", "92223333", "carol@example.com",
	                "789 Bukit Timah", sdf.parse("1992-07-10"), Role.USER
	        ));
	        
	        // caetgory dummy data
	        Category electronics = categoryRepo.save(new Category("Electronics"));
	        categoryRepo.save(new Category("Home Appliances"));
	        categoryRepo.save(new Category("Fashion"));
	        
	        // product dummy data
	        Product product_1 = productRepo.save(new Product(
	        	    "Wireless Headphones", "Noise-cancelling over-ear headphones", electronics, "SoundMagic", 129.99f, 50,
	        	    "https://example.com/images/headphones.jpg", 4f
	        	));

        	Product product_2 = productRepo.save(new Product(
        	    "Smart Watch", "Water-resistant smart watch with fitness tracking", electronics, "FitTech", 89.50f, 75,
        	    "https://example.com/images/smartwatch.jpg", 3f
        	));

        	Product product_3 = productRepo.save(new Product(
        	    "Gaming Mouse", "RGB gaming mouse with 6 programmable buttons", electronics, "ProGamer", 45.90f, 100,
        	    "https://example.com/images/gamingmouse.jpg", 5f
        	));
			
			// cart item dummy data
        	cartRepo.save(new CartItem(
    		    user_1, product_1, 2 // Alice buys 2 Wireless Headphones
    		));

    		cartRepo.save(new CartItem(
    		    user_1, product_3, 1 // Alice buys 1 Gaming Mouse
    		));

    		cartRepo.save(new CartItem(
    		    user_2, product_2, 3 // Bob buys 3 Smart Watches
    		));

    		cartRepo.save(new CartItem(
    		    user_3, product_1, 1 // Carol buys 1 Wireless Headphones
    		));

    		cartRepo.save(new CartItem(
    		    user_3, product_2, 2 // Carol buys 2 Smart Watches
    		));
    		
    		// delivery type dummy data
    		deliTypeRepo.save(new DeliveryType(
			    "Standard Delivery", "Delivered within 3–5 working days", 3.50f
			));

			deliTypeRepo.save(new DeliveryType(
			    "Express Delivery", "Delivered within 1–2 working days", 7.90f
			));

			deliTypeRepo.save(new DeliveryType(
			    "Same-Day Delivery", "Delivered on the same day if ordered before 12pm", 12.00f
			));
		};
		
	}

}
