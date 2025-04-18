package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.interfacemethods.WishlistService;
import sg.nus.iss.spring.backend.model.Wishlist;
import sg.nus.iss.spring.backend.service.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishListController {
    @Autowired
    private WishlistService wishlistService;

    @Autowired
    public void setListService(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/{userId}")
    public List<Wishlist> getAllWishlists(@PathVariable Integer userId) {
        return wishlistService.findAllUserWishlists(userId);
    }

    @PostMapping
    public Wishlist addWishlist(@RequestBody Wishlist wishlist) {
        return wishlistService.saveWishlist(wishlist);
    }

    @DeleteMapping("/{id}")
    public void deleteWishlist(@PathVariable Integer id) {
        wishlistService.deleteWishlistById(id);
    }
}
