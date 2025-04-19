package sg.nus.iss.spring.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "delivery_types")
public class DeliveryType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String description;

    private float fee;

    // Constructors
    public DeliveryType() {}

    public DeliveryType(String name, String description, float fee) {
        this.name = name;
        this.description = description;
        this.fee = fee;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getFee() {
        return fee;
    }

    public void setFee(float fee) {
        this.fee = fee;
    }
}
