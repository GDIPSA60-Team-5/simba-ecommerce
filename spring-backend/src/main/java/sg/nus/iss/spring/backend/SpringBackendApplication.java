package sg.nus.iss.spring.backend;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.repository.CartRepository;
import sg.nus.iss.spring.backend.repository.ProductRepository;
import sg.nus.iss.spring.backend.repository.UserRepository;

@SpringBootApplication
public class SpringBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBackendApplication.class, args);
    }
    
//    @Bean
//	CommandLineRunner loadData(CartRepository cartRepo, UserRepository userRepo, ProductRepository productRepo) {
//		return(args) -> {
//			// Parse the string to LocalDate
//			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
//			Date date = formatter.parse("12/12/2023");
//
//			User user1 = new User("Aung", "Moe", "asdf", "123", "dfhd", "wery", "ili", date, "erter");
//			userRepo.save(user1);
//			
//			Product product1 = new Product("asdf", "bb", "dd", 1f, 2, "a", 1f);
//			productRepo.save(product1);
//			
//			// add a few cart items
//			CartItem cart1 = new CartItem(user1, product1, 3);
//			cartRepo.save(cart1);
//			
//			User user2 = new User("wer", "uiu", "amm", "io", "rtyrt", "23", "kyuk", date, "li");
//			userRepo.save(user2);
//			
//			Product product2 = new Product("aa", "bb", "cc", 1f, 2, "a", 1f);
//			productRepo.save(product2);
//			
//			// add a few cart items
//			CartItem cart2 = new CartItem(user2, product2, 3);
//			cartRepo.save(cart2);
//			
//			User user3 = new User("wersd", "uisdu", "asdmm", "isdo", "rtysdrt", "2sd3", "ksdyuk", date, "lisd");
//			userRepo.save(user3);
//			
//			Product product3 = new Product("asda", "bsdb", "csdc", 1f, 2, "sda", 1f);
//			productRepo.save(product3);
//			
//			// add a few cart items
//			CartItem cart3 = new CartItem(user3, product3, 3);
//			cartRepo.save(cart3);
//			
//			CartItem cart4 = new CartItem(user1, product2, 2);
//			CartItem cart5 = new CartItem(user1, product3, 5);
//			
//			cartRepo.save(cart4);
//			cartRepo.save(cart5);
//		};
//		
//	}

}
