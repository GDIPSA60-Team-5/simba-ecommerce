package sg.nus.iss.spring.backend.interfacemethods;

import java.util.List;

import sg.nus.iss.spring.backend.model.DeliveryType;

public interface DeliveryService {
	List<DeliveryType> getDeliType();
}
