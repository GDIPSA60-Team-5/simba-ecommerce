package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

}
