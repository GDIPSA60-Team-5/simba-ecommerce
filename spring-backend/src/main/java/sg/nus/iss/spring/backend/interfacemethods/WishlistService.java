package sg.nus.iss.spring.backend.interfacemethods;

import sg.nus.iss.spring.backend.model.Wishlist;

import java.util.List;

public interface WishlistService {
    List<Wishlist> findAllUserWishlists(int id);
    Wishlist saveWishlist(Wishlist wishlist);
    void deleteWishlistById(int id);
}
