package sg.nus.iss.spring.backend.interfacemethods;


import sg.nus.iss.spring.backend.model.Order;

import java.util.List;

public interface OrderService {
    List<Order> findAllOrders();
    Order findOrderById(Integer orderId);
    Order saveOrder(Order order);
    Order editOrder(Order order);
    void deleteOrder(Integer orderId);
}
