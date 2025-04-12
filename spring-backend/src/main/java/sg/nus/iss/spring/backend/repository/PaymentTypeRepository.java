package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.nus.iss.spring.backend.model.PaymentType;

public interface PaymentTypeRepository extends JpaRepository<PaymentType, Long> {
}
