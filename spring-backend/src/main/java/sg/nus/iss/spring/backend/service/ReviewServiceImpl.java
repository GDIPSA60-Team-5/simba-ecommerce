package sg.nus.iss.spring.backend.service;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sg.nus.iss.spring.backend.dto.ReviewPostRequestDTO;
import sg.nus.iss.spring.backend.exception.auth.ResourceNotFoundException;
import sg.nus.iss.spring.backend.interfacemethods.ReviewService;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.model.Review;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.repository.ProductRepository;
import sg.nus.iss.spring.backend.repository.ReviewRepository;
import sg.nus.iss.spring.backend.util.SessionUtils;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Review> findAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review findReviewById(int id) {
        return reviewRepository.findById(id);
    }

    @Override
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review editReview(int id, Review review) {
        reviewRepository.existsById(id);
        review.setId(id);
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReviewById(int id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public List<Review> findByProductId(int productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review postReviewFromSessionUser(HttpSession session, int productId, ReviewPostRequestDTO reviewContent) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        User user = SessionUtils.getUserFromSession(session);

        /* Create review */
        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setRating(reviewContent.getRating());
        review.setComment(reviewContent.getContent());
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }
}
