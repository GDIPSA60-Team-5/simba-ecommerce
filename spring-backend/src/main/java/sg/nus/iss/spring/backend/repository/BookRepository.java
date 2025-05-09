package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.nus.iss.spring.backend.model.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
