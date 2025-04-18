package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.nus.iss.spring.backend.model.Wishlist;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    List<Wishlist> findByUserId(int userId);
}
