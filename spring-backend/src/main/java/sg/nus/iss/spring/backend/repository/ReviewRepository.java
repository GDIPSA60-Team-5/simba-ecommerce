package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.nus.iss.spring.backend.model.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review findById(int id);

    List<Review> findByProductId(int productId);
}
