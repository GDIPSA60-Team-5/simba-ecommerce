package sg.nus.iss.spring.backend.interfacemethods;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import sg.nus.iss.spring.backend.dto.ReviewPostRequestDTO;
import sg.nus.iss.spring.backend.model.Review;
import sg.nus.iss.spring.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    List<Review> findAllReviews();
    Review findReviewById(int id);
    Review createReview(Review review);
    Review editReview(int reviewId, Review review);
    void deleteReviewById(int id);
    List<Review> findByProductId(int productId);

    Review postReviewFromSessionUser(HttpSession session, int productId, ReviewPostRequestDTO reviewContent);
}
