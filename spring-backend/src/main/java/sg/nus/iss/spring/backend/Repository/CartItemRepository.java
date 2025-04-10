package sg.nus.iss.spring.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer>{

}
