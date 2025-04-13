package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.nus.iss.spring.backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findByOrderId(Integer orderId);
}
