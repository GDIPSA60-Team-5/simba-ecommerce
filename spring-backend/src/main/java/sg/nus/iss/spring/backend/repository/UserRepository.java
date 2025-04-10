package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.Role;
import sg.nus.iss.spring.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

    User findByUsernameAndRole(String username, Role role);

    boolean existsByUsername(String username);
}
