package sg.nus.iss.spring.backend.repository;

import sg.nus.iss.spring.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(int userId);
    List<Order> findByUserIdAndStatus(int userId, String status);
    void deleteById(Integer orderId);
}
