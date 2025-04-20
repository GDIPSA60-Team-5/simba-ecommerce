package sg.nus.iss.spring.backend.enums;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;


/* Written by Phyo Nyi Nyi Paing */
public enum OrderStatus {
    SHIPPING,
    DELIVERED,
    CANCELLED,
    CANCELLING,
    RETURNED,

}
