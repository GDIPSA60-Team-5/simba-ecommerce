package sg.nus.iss.spring.backend.interfacemethods;

import sg.nus.iss.spring.backend.model.Review;
import java.util.List;

public interface ReviewService {
    List<Review> findAllReviews();
    Review findReviewById(int id);
    Review saveReview(Review review);
    void deleteReviewById(int id);
}
