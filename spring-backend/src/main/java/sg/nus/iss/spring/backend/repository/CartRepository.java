package sg.nus.iss.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.CartItem;

public interface CartRepository extends JpaRepository<CartItem, Integer> {

	List<CartItem> findAllByUser_Id(int userId);
	void deleteAllByUser_Id(int userId);

}
