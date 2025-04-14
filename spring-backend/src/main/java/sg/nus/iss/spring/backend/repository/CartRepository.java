package sg.nus.iss.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.User;

public interface CartRepository extends JpaRepository<CartItem, Integer> {

	List<CartItem> findAllByUser(User user);
	void deleteAllByUser(User user);

}
