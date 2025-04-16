package sg.nus.iss.spring.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.Cart;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.User;

public interface CartRepository extends JpaRepository<Cart, Integer> {

	List<CartItem> findAllByUser(User user);
	void deleteAllByUser(User user);
	Optional<Cart> findByUser(User user);

}
