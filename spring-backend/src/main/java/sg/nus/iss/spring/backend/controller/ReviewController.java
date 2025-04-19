package sg.nus.iss.spring.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.dto.ReviewPostRequestDTO;
import sg.nus.iss.spring.backend.exception.auth.ResourceNotFoundException;
import sg.nus.iss.spring.backend.exception.auth.UserNotAuthenticatedException;
import sg.nus.iss.spring.backend.interfacemethods.ReviewService;
import sg.nus.iss.spring.backend.model.Review;
import sg.nus.iss.spring.backend.service.ReviewServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    public void setListService(ReviewServiceImpl reviewServiceImpl) {
        this.reviewService = reviewServiceImpl;
    }

    @GetMapping("/products/{productId}/reviews")
    public List<Review> getReviewsByProduct(@PathVariable int productId) {
        return reviewService.findByProductId(productId);
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<Review> postReviewFromSessionUser(@PathVariable int productId, @RequestBody ReviewPostRequestDTO reviewContent, HttpSession session) {
        try {
            Review newReview = reviewService.postReviewFromSessionUser(session, productId, reviewContent);
            return new ResponseEntity<>(newReview, HttpStatus.CREATED);

        } catch (UserNotAuthenticatedException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/reviews")
    public List<Review> getReviews() {
        return reviewService.findAllReviews();
    }

    @PostMapping("/reviews")
    public Review addReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }

    @PutMapping("/reviews/{id}")
    public Review editReview(@PathVariable int id, @RequestBody Review review) {
        return reviewService.editReview(id, review);
    }

    @DeleteMapping("/reviews/{id}")
    public void deleteReview(@PathVariable int id) {
        reviewService.deleteReviewById(id);
    }

}
