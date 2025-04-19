package sg.nus.iss.spring.backend.dto;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public class OrderDetailsDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@NotBlank(message = "Delivery type is required")
    private String deliveryType;
	
	@NotBlank(message = "Shipping address required")
	@Size(min = 10, max = 255, message = "Address must be within 10 - 255 characters")
	String shippingAddress;
		
	public OrderDetailsDTO(String deliveryType, String shippingAddress) {
		this.deliveryType = deliveryType;
		this.shippingAddress = shippingAddress;
	}

	public String getDeliveryType() {
		return deliveryType;
	}

	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}
}
