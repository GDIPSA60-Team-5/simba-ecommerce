package sg.nus.iss.spring.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sg.nus.iss.spring.backend.interfacemethods.OrderService;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.repository.OrderRepository;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order findOrderById(Integer orderId) {
        return orderRepository.findOrderById(orderId);
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order editOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Integer OrderId) {
        orderRepository.deleteById(OrderId);
    }
}
