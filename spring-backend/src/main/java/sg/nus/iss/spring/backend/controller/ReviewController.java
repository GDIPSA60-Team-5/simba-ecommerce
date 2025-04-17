package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.interfacemethods.ReviewService;
import sg.nus.iss.spring.backend.model.Review;
import sg.nus.iss.spring.backend.service.ReviewServiceImpl;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    public void setListService(ReviewServiceImpl reviewServiceImpl) {
        this.reviewService = reviewServiceImpl;
    }

    @GetMapping
    public List<Review> getReviews() {
        return reviewService.findAllReviews();
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable int id) {
        reviewService.deleteReviewById(id);
    }
}
