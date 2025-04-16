package sg.nus.iss.spring.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.DeliveryType;

public interface DeliveryTypeRepository extends JpaRepository<DeliveryType, Integer> {
	Optional<DeliveryType> findByName(String deliType);
}
