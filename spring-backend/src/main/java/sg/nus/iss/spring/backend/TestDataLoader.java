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
            item1.setThumbnail("https://example.com/image1.jpg");
            item1.setOrder(order1);
            order1.setOrderItems(List.of(item1));

            // Order 2
            Order order2 = new Order();
            order2.setUserId(2);
            order2.setTotalAmount(459.5f);
            order2.setStatus("Processing");
            order2.setDateTime(LocalDateTime.now());
            OrderItem item2 = new OrderItem();
            item2.setName("Mechanical Keyboard");
            item2.setQuantity(1);
            item2.setThumbnail("https://example.com/keyboard.jpg");
            item2.setOrder(order2);
            order2.setOrderItems(List.of(item2));

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
            OrderItem item4 = new OrderItem();
            item4.setName("USB-C Hub");
            item4.setQuantity(1);
            item4.setThumbnail("https://example.com/hub.jpg");
            item4.setOrder(order4);
            order4.setOrderItems(List.of(item4));

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

            // Order 6
            Order order6 = new Order();
            order6.setUserId(6);
            order6.setTotalAmount(150.0f);
            order6.setStatus("Processing");
            order6.setDateTime(LocalDateTime.now());
            OrderItem item6 = new OrderItem();
            item6.setName("Gaming Headset");
            item6.setQuantity(1);
            item6.setThumbnail("https://example.com/headset.jpg");
            item6.setOrder(order6);
            order6.setOrderItems(List.of(item6));

            // Order 7
            Order order7 = new Order();
            order7.setUserId(7);
            order7.setTotalAmount(750.0f);
            order7.setStatus("Shipped");
            order7.setDateTime(LocalDateTime.now());
            OrderItem item7 = new OrderItem();
            item7.setName("Graphic Card");
            item7.setQuantity(1);
            item7.setThumbnail("https://example.com/graphiccard.jpg");
            item7.setOrder(order7);
            order7.setOrderItems(List.of(item7));

            // Order 8
            Order order8 = new Order();
            order8.setUserId(8);
            order8.setTotalAmount(500.0f);
            order8.setStatus("Delivered");
            order8.setDateTime(LocalDateTime.now());
            OrderItem item8 = new OrderItem();
            item8.setName("SSD Drive 1TB");
            item8.setQuantity(1);
            item8.setThumbnail("https://example.com/ssd.jpg");
            item8.setOrder(order8);
            order8.setOrderItems(List.of(item8));

            // Order 9
            Order order9 = new Order();
            order9.setUserId(9);
            order9.setTotalAmount(320.0f);
            order9.setStatus("Processing");
            order9.setDateTime(LocalDateTime.now());
            OrderItem item9 = new OrderItem();
            item9.setName("Bluetooth Speaker");
            item9.setQuantity(1);
            item9.setThumbnail("https://example.com/speaker.jpg");
            item9.setOrder(order9);
            order9.setOrderItems(List.of(item9));

            // Order 10
            Order order10 = new Order();
            order10.setUserId(10);
            order10.setTotalAmount(600.0f);
            order10.setStatus("Cancelled");
            order10.setDateTime(LocalDateTime.now());
            OrderItem item10 = new OrderItem();
            item10.setName("4K TV");
            item10.setQuantity(1);
            item10.setThumbnail("https://example.com/tv.jpg");
            item10.setOrder(order10);
            order10.setOrderItems(List.of(item10));

            repository.saveAll(List.of(order1, order2, order3, order4, order5, order6, order7, order8, order9, order10));
            System.out.println("Test data inserted successfully!");
        };
    }
}
