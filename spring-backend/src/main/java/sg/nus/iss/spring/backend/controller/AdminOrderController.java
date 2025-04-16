package sg.nus.iss.spring.backend.controller;

import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.model.OrderItem;
import sg.nus.iss.spring.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.format.annotation.DateTimeFormat;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // 获取所有订单（支持筛选和分页）
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders(
            @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {

        // 根据条件获取过滤后的所有订单
        List<Order> orders = orderService.getAllOrdersFiltered(userId, status, dateFrom, dateTo);

        // 如果传入了分页参数，则截取相应的子列表
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

    // 获取订单详情
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable("orderId") int orderId) {
        Order order = orderService.getOrderDetails(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    // 修改订单状态
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

    // 删除订单
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("orderId") int orderId) {
        Order order = orderService.getOrderDetails(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    // 导出订单数据（模拟，返回所有订单数据）
    @GetMapping("/export")
    public ResponseEntity<List<Order>> exportOrders() {
        List<Order> orders = orderService.getAllOrdersFiltered(null, null, null, null);
        return ResponseEntity.ok(orders);
    }

    // 添加订单备注（管理员内部备注）
    @PostMapping("/{orderId}/note")
    public ResponseEntity<Order> addAdminNote(@PathVariable("orderId") int orderId,
                                              @RequestBody Map<String, String> request) {
        Order order = orderService.getOrderDetails(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        String note = request.get("note");
        order.setAdminNote(note);
        orderService.saveOrder(order);
        return ResponseEntity.ok(order);
    }

    // 修改订单项（商品）信息，更新订单项的名称和数量
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
        if (request.containsKey("name")) {
            foundItem.setName((String) request.get("name"));
        }
        if (request.containsKey("quantity")) {
            int quantity = ((Number) request.get("quantity")).intValue();
            foundItem.setQuantity(quantity);
        }
        // 因为订单和订单项配置了级联更新，所以只需要保存订单
        orderService.saveOrder(order);
        return ResponseEntity.ok(foundItem);
    }
}
