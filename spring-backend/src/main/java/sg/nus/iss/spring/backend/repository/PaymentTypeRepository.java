package sg.nus.iss.spring.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.PaymentType;

public interface PaymentTypeRepository extends JpaRepository<PaymentType, Integer> {
	Optional<PaymentType> findByName(String name);
}
