package sg.nus.iss.spring.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.model.OrderItem;
import sg.nus.iss.spring.backend.repository.OrderRepository;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class TestDataLoader {

    @Bean
    CommandLineRunner initDatabase(OrderRepository repository) {
        return args -> {
            // Order 1
            Order order1 = new Order();
            order1.setUserId(1);
            order1.setTotalAmount(299.0f);
            order1.setStatus("Delivered");
            order1.setDateTime(LocalDateTime.now());

            OrderItem item1 = new OrderItem();
            item1.setName("NUUA S4 Pro");
            item1.setQuantity(1);
            item1.setThumbnail("https://example.com/image.jpg");
            item1.setOrder(order1);
            order1.setOrderItems(List.of(item1));

            // Order 2
            Order order2 = new Order();
            order2.setUserId(2);
            order2.setTotalAmount(459.5f);
            order2.setStatus("Processing");
            order2.setDateTime(LocalDateTime.now());

            OrderItem item2a = new OrderItem();
            item2a.setName("Mechanical Keyboard");
            item2a.setQuantity(1);
            item2a.setThumbnail("https://example.com/keyboard.jpg");
            item2a.setOrder(order2);

            OrderItem item2b = new OrderItem();
            item2b.setName("RGB Mouse Pad");
            item2b.setQuantity(2);
            item2b.setThumbnail("https://example.com/mousepad.jpg");
            item2b.setOrder(order2);

            order2.setOrderItems(List.of(item2a, item2b));

            // Order 3
            Order order3 = new Order();
            order3.setUserId(3);
            order3.setTotalAmount(1200.0f);
            order3.setStatus("Shipped");
            order3.setDateTime(LocalDateTime.now());

            OrderItem item3 = new OrderItem();
            item3.setName("UltraWide Monitor 34\"");
            item3.setQuantity(1);
            item3.setThumbnail("https://example.com/monitor.jpg");
            item3.setOrder(order3);

            order3.setOrderItems(List.of(item3));

            // Order 4
            Order order4 = new Order();
            order4.setUserId(4);
            order4.setTotalAmount(80.0f);
            order4.setStatus("Cancelled");
            order4.setDateTime(LocalDateTime.now());

            OrderItem item4a = new OrderItem();
            item4a.setName("USB-C Hub");
            item4a.setQuantity(1);
            item4a.setThumbnail("https://example.com/hub.jpg");
            item4a.setOrder(order4);

            OrderItem item4b = new OrderItem();
            item4b.setName("Laptop Sleeve 15\"");
            item4b.setQuantity(1);
            item4b.setThumbnail("https://example.com/sleeve.jpg");
            item4b.setOrder(order4);

            order4.setOrderItems(List.of(item4a, item4b));

            // Order 5
            Order order5 = new Order();
            order5.setUserId(5);
            order5.setTotalAmount(35.5f);
            order5.setStatus("Delivered");
            order5.setDateTime(LocalDateTime.now());

            OrderItem item5 = new OrderItem();
            item5.setName("Wireless Mouse");
            item5.setQuantity(1);
            item5.setThumbnail("https://example.com/wmouse.jpg");
            item5.setOrder(order5);

            order5.setOrderItems(List.of(item5));


            repository.saveAll(List.of(order1, order2, order3, order4, order5));

            System.out.println("Test data inserted successfully!");
        };
    }
}
