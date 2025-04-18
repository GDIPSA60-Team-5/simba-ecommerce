package sg.nus.iss.spring.backend.controller;

import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.model.OrderItem;
import sg.nus.iss.spring.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable("orderId") int orderId, @RequestParam String status) {
        Order order = orderService.getOrderDetails(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        order.setStatus(status);
        orderService.saveOrder(order);
        return ResponseEntity.ok(order);
    }


    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("orderId") int orderId) {
        Order order = orderService.getOrderDetails(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable("orderId") int orderId,
                                             @RequestBody Order order) {
        order.setId(orderId);
        orderService.saveOrder(order);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/export")
    public ResponseEntity<List<Order>> exportOrders() {
        List<Order> orders = orderService.getAllOrdersFiltered(null, null, null, null);
        return ResponseEntity.ok(orders);
    }

    @PatchMapping("/{orderId}/items/{itemId}")
    public ResponseEntity<OrderItem> updateOrderItem(@PathVariable("orderId") int orderId,
                                                     @PathVariable("itemId") int itemId,
                                                     @RequestBody Map<String, Object> request) {
        Order order = orderService.getOrderDetails(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        List<OrderItem> items = order.getOrderItems();
        if (items == null) {
            return ResponseEntity.notFound().build();
        }
        OrderItem foundItem = items.stream()
                .filter(item -> item.getId() == itemId)
                .findFirst()
                .orElse(null);
        if (foundItem == null) {
            return ResponseEntity.notFound().build();
        }

        if (request.containsKey("quantity")) {
            int quantity = ((Number) request.get("quantity")).intValue();
            foundItem.setQuantity(quantity);
        }

        orderService.saveOrder(order);
        return ResponseEntity.ok(foundItem);
    }
}
