package sg.nus.iss.spring.backend.service;

import sg.nus.iss.spring.backend.dto.OrderDTO;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.model.OrderItem;
import sg.nus.iss.spring.backend.repository.OrderRepository;
import sg.nus.iss.spring.backend.dto.OrderItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderDTO> getOrdersByUser(int userId) {

        List<Order> orderList = orderRepository.findByUserId(userId);
        return orderList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public OrderDTO getOrderDetails(int orderId) {

        return orderRepository.findById(orderId)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public List<OrderDTO> getOrdersByUserAndStatus(int userId, String status) {
        List<Order> orderList = orderRepository.findByUserIdAndStatus(userId, status);
        return orderList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setOrderId(order.getOrderId());
        // totalAmount 現在為 float 型態
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setDateTime(order.getDateTime());

        List<OrderItemDTO> items = order.getOrderItems().stream()
                .map(this::convertItemToDTO)
                .collect(Collectors.toList());
        dto.setItems(items);

        return dto;
    }

    private OrderItemDTO convertItemToDTO(OrderItem item) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setProductName(item.getName());
        dto.setQuantity(item.getQuantity());
        dto.setThumbnail(item.getThumbnail());
        return dto;
    }

    public List<OrderDTO> getAllOrdersFiltered(Integer userId, String status, LocalDate dateFrom, LocalDate dateTo) {
        // 這裡將 userId 改為 Integer 以允許 null 判斷
        List<Order> filtered = orderRepository.findAll().stream()
                .filter(order -> userId == null || order.getUserId() == userId)
                .filter(order -> status == null || order.getStatus().equalsIgnoreCase(status))
                .filter(order -> dateFrom == null || !order.getDateTime().toLocalDate().isBefore(dateFrom))
                .filter(order -> dateTo == null || !order.getDateTime().toLocalDate().isAfter(dateTo))
                .collect(Collectors.toList());

        return filtered.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
