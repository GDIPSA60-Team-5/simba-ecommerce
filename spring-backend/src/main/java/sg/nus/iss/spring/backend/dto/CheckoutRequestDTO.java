package sg.nus.iss.spring.backend.dto;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public class CheckoutRequestDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@NotNull(message = "Delivery type is required")
    private Integer deliveryTypeId;
	
	@NotBlank(message = "Shipping address required")
	@Size(min = 10, max = 255, message = "Address must be within 10 - 255 characters")
	String shippingAddress;
		
	public CheckoutRequestDTO(Integer deliveryTypeId, String shippingAddress) {
		this.deliveryTypeId = deliveryTypeId;
		this.shippingAddress = shippingAddress;
	}

	public Integer getDeliveryTypeId() {
		return deliveryTypeId;
	}

	public void setDeliveryTypeId(Integer deliveryTypeId) {
		this.deliveryTypeId = deliveryTypeId;
	}

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}
}
