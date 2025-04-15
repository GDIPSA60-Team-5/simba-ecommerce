package sg.nus.iss.spring.backend;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import sg.nus.iss.spring.backend.model.PaymentType;
import sg.nus.iss.spring.backend.repository.PaymentTypeRepository;

@SpringBootTest
@ActiveProfiles("test")
public class PaymentTypeCreationTests {
    @Autowired
    private PaymentTypeRepository payRepo;

    @Test
    public void testCreatePaymentType() {
        payRepo.save(new PaymentType("Pay now"));
        payRepo.save(new PaymentType("Card"));
    }

}
