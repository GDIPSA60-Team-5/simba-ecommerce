package sg.nus.iss.spring.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sg.nus.iss.spring.backend.interfacemethods.DeliveryTypeService;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.service.DeliveryTypeServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DeliveryTypeController
{
    private final DeliveryTypeService deliveryTypeService;

    public DeliveryTypeController(DeliveryTypeServiceImpl deliveryTypeService) {
        this.deliveryTypeService = deliveryTypeService;
    }

    @GetMapping("/delivery-types")
    public List<DeliveryType> getAllDeliveryTypes() {
        return deliveryTypeService.getDeliType();
    }
}
