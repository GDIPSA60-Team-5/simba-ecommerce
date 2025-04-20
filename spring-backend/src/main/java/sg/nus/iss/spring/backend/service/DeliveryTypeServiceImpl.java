package sg.nus.iss.spring.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.nus.iss.spring.backend.interfacemethods.DeliveryTypeService;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.repository.DeliveryTypeRepository;

@Service
public class DeliveryTypeServiceImpl implements DeliveryTypeService {
	@Autowired
	DeliveryTypeRepository deliRepo;
	
	@Override
	public List<DeliveryType> getDeliType() {
		return deliRepo.findAll();
	}
}
