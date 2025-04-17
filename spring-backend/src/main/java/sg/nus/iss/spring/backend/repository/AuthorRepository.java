package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.nus.iss.spring.backend.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
}
