package sg.nus.iss.spring.backend.controller;

import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable("userId") int userId) {
        List<Order> orders = orderService.getOrdersByUser(userId);
        return ResponseEntity.ok(orders);
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable("orderId") int orderId) {
        Order order = orderService.getOrderDetails(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }


    @GetMapping("/user/{userId}/")
    public ResponseEntity<List<Order>> getOrdersByUserAndStatus(
            @PathVariable("userId") int userId,
            @RequestParam("status") String status) {
        List<Order> orders = orderService.getOrdersByUserAndStatus(userId, status);
        return ResponseEntity.ok(orders);
    }


    @GetMapping("/admin/all")
    public ResponseEntity<List<Order>> getAllOrders(
            @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        List<Order> orders = orderService.getAllOrdersFiltered(userId, status, dateFrom, dateTo);
        return ResponseEntity.ok(orders);
    }
}
