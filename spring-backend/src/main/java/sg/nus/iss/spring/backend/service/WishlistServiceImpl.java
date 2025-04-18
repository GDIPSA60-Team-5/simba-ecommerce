package sg.nus.iss.spring.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sg.nus.iss.spring.backend.interfacemethods.WishlistService;
import sg.nus.iss.spring.backend.model.Wishlist;
import sg.nus.iss.spring.backend.repository.WishlistRepository;

import java.util.List;

@Service
@Transactional
public class WishlistServiceImpl implements WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    @Override
    public List<Wishlist> findAllUserWishlists(int id) {
        return wishlistRepository.findByUserId(id);
    }

    @Override
    public Wishlist saveWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    @Override
    public void deleteWishlistById(int id) {
        wishlistRepository.deleteById(id);
    }
}
