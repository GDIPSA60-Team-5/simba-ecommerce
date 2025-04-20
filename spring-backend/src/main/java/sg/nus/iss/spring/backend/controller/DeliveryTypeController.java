package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import sg.nus.iss.spring.backend.interfacemethods.DeliveryService;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.service.DeliveryServiceImpl;

import java.util.List;

public class DeliveryController
{
    private DeliveryService deliveryService;

    public DeliveryController(DeliveryServiceImpl deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/delivery-types")
    public List<DeliveryType> getAllDeliveryTypes() {
        return deliveryService.getDeliType();
    }
}
