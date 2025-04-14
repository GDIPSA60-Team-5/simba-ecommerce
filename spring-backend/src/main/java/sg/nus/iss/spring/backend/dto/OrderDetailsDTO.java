package sg.nus.iss.spring.backend.dto;

import java.io.Serializable;

public class OrderDetailsDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	String deliveryType;
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
