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

    @ManyToMany
    @JoinTable(
            name = "order_items",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> products;

    // Constructors
    public Order() {
    	
    }

    public Order(User user, PaymentType paymentType, DeliveryType deliveryType, String status, LocalDateTime dateTime,
    		String shippingAddress, float goodsServiceTax, List<Product> products) {
		this.user = user;
		this.paymentType = paymentType;
		this.deliveryType = deliveryType;
		this.status = status;
		this.dateTime = dateTime;
		this.shippingAddress = shippingAddress;
		this.goodsServiceTax = goodsServiceTax;
		this.products = products;
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

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
