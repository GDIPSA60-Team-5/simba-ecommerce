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

    @GetMapping("/{id}")
    public Order findOrderById(@PathVariable("id") Integer id) {
        return orderService.findOrderById(id);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    @PutMapping("/{id}")
    public Order editOrder(@RequestBody Order order, @PathVariable("id") Integer id) {
        order.setOrderId(id);
        return orderService.editOrder(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable("id") Integer id) {
        orderService.deleteOrder(id);
    }
}
