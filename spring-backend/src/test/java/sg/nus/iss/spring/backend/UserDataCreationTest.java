package sg.nus.iss.spring.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import sg.nus.iss.spring.backend.model.Role;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.repository.UserRepository;

import java.text.SimpleDateFormat;

@SpringBootTest
@ActiveProfiles("test")
public class UserDataCreationTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void seedFiveUsersDirectly() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        userRepository.save(new User(
                "Alice", "Tan", "alice", "pass123", "91234567", "alice@example.com",
                "123 Orchard Rd", sdf.parse("1990-01-01"), Role.USER
        ));

        userRepository.save(new User(
                "Bob", "Lee", "bob", "pass123", "98765432", "bob@example.com",
                "456 Clementi Rd", sdf.parse("1985-05-15"), Role.ADMIN
        ));

        userRepository.save(new User(
                "Carol", "Lim", "carol", "pass123", "92223333", "carol@example.com",
                "789 Bukit Timah", sdf.parse("1992-07-10"), Role.USER
        ));

        userRepository.save(new User(
                "David", "Ng", "david", "pass123", "93334444", "david@example.com",
                "101 Marina Blvd", sdf.parse("1988-11-25"), Role.ADMIN
        ));

        userRepository.save(new User(
                "Eve", "Goh", "eve", "pass123", "94445555", "eve@example.com",
                "202 Paya Lebar", sdf.parse("1995-03-30"), Role.USER
        ));
    }
}
