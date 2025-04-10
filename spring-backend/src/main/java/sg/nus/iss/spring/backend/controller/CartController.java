package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sg.nus.iss.spring.backend.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	
	@Autowired 
	private CartService cartService;
	
	@PostMapping("/{cartId}/add")
	public ResponseEntity<String> addToCart(@PathVariable int cartId, @RequestParam int productId, @RequestParam int quantity){
		cartService.addToCart(cartId, productId, quantity);
		return ResponseEntity.ok("Product added to cart");
	}
	
	
	

}
