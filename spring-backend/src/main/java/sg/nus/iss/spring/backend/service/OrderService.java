package sg.nus.iss.spring.backend.service;

import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getOrdersByUser(int userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderDetails(int orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public List<Order> getOrdersByUserAndStatus(int userId, String status) {
        return orderRepository.findByUserIdAndStatus(userId, status);
    }

    public List<Order> getAllOrdersFiltered(Integer userId, String status, LocalDate dateFrom, LocalDate dateTo) {
        return orderRepository.findAll().stream()
                .filter(order -> userId == null || order.getUserId() == userId)
                .filter(order -> status == null || order.getStatus().equalsIgnoreCase(status))
                .filter(order -> dateFrom == null || !order.getDateTime().toLocalDate().isBefore(dateFrom))
                .filter(order -> dateTo == null || !order.getDateTime().toLocalDate().isAfter(dateTo))
                .toList();
    }
}
