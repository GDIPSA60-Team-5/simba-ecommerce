package sg.nus.iss.spring.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import sg.nus.iss.spring.backend.exception.auth.UserNotAuthenticatedException;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.enums.OrderStatus;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.util.SessionUtils;

import java.time.LocalDate;
import java.util.List;

/* Written By Huang Jing Jia */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @GetMapping("/user/{user}")
    public ResponseEntity<List<Order>> getAllOrders(
            @PathVariable(required = false) User user,
            @RequestParam(required = false) OrderStatus orderstatus,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {

        List<Order> orders = orderService.getAllOrdersFiltered(user, orderstatus, dateFrom, dateTo);

        if (page != null && size != null) {
            int fromIndex = page * size;
            int toIndex = Math.min(fromIndex + size, orders.size());
            if (fromIndex > orders.size()) {
                orders = List.of();
            } else {
                orders = orders.subList(fromIndex, toIndex);
            }
        }
        return ResponseEntity.ok(orders);
    }

    @PutMapping("{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Integer orderId) {
        boolean success = orderService.cancelOrder(orderId);
        if (success) {
            return ResponseEntity.ok("Order cancelled successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to cancel order");
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable("orderId") int orderId, HttpSession session) {
        try {
            User user = SessionUtils.getUserFromSession(session);

            Order order = orderService.getOrderDetails(orderId);
            if (order == null) return ResponseEntity.notFound().build();

            if (order.getUser().getId() != user.getId()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

            return ResponseEntity.ok(order);
        } catch (UserNotAuthenticatedException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
