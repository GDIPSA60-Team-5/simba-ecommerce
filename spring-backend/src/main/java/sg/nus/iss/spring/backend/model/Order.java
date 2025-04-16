package sg.nus.iss.spring.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "payment_type_id", nullable = false)
    private PaymentType paymentType;

    @ManyToOne
    @JoinColumn(name = "delivery_type_id", nullable = false)
    private DeliveryType deliveryType;

    private String status;

    private LocalDateTime dateTime;

    private String shippingAddress;

    private float goodsServiceTax;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItem> orderItems;

    // Constructors
    public Order() {

    }

    public Order(User user, PaymentType paymentType, DeliveryType deliveryType, String status, LocalDateTime dateTime,
    		String shippingAddress) {
		this.user = user;
		this.paymentType = paymentType;
		this.deliveryType = deliveryType;
		this.status = status;
		this.dateTime = dateTime;
		this.shippingAddress = shippingAddress;
		this.goodsServiceTax = 0.09f;
	}

	// Getters and Setters
    public int getOrderId() {
        return id;
    }

    public void setOrderId(int orderId) {
        this.id = orderId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public DeliveryType getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(DeliveryType deliveryType) {
        this.deliveryType = deliveryType;
    }

    public float getTotalAmount() {
        return orderItems.size();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public float getGoodsServiceTax() {
        return goodsServiceTax;
    }

    public void setGoodsServiceTax(float goodsServiceTax) {
        this.goodsServiceTax = goodsServiceTax;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
