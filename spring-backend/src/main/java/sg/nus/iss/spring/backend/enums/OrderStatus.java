package sg.nus.iss.spring.backend.enums;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public enum OrderStatus {
    SHIPPING,
    DELIVERED,
    CANCELLED,
    RETURNED
}
