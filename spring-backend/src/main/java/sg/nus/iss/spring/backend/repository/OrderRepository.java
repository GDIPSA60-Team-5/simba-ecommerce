package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.enums.OrderStatus;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findOrderById(Integer orderId);
    List<Order> findByUserId(Integer userId);
    List<Order> findByUserIdAndStatus(Integer userId, OrderStatus status);
}
