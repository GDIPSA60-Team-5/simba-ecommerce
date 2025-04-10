package sg.nus.iss.spring.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer>{

}
