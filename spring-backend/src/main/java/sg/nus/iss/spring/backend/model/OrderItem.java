package sg.nus.iss.spring.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    private Product product;

    private int quantity;
    private float unitPriceAtTransaction;

    public OrderItem() {

    }

    public OrderItem(Order order, Product product, int quantity, float unitPriceAtTransaction) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.unitPriceAtTransaction = unitPriceAtTransaction;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }
    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getUnitPriceAtTransaction() {
        return unitPriceAtTransaction;
    }

    public void setUnitPriceAtTransaction(float unitPriceAtTransaction) {
        this.unitPriceAtTransaction = unitPriceAtTransaction;
    }
}
