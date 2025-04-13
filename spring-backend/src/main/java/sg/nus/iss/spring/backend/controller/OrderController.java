package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.interfacemethods.OrderService;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.service.OrderServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/Orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    public void setListService(OrderServiceImpl orderServiceImpl) {
        this.orderService = orderServiceImpl;
    }

    @GetMapping
    public List<Order> findAllOrders() {
        return orderService.findAllOrders();
    }

    @GetMapping
    public Order findOrderById(@RequestParam Integer orderId) {
        return orderService.findOrderById(orderId);
    }

    @PostMapping
    public Order createOrder(@RequestParam Order order) {
        return orderService.saveOrder(order);
    }

    @PutMapping
    public Order editOrder(@RequestParam Order order) {
        return orderService.editOrder(order);
    }

    @DeleteMapping
    public void deleteOrder(@RequestParam Integer OrderId) {
        orderService.deleteOrder(OrderId);
    }
}
