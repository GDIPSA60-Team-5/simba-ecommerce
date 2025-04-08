package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

}
