package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.nus.iss.spring.backend.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review findById(int id);
}
