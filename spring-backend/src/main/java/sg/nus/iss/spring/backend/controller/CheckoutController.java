package sg.nus.iss.spring.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CheckoutController {
	// simulate a checkout page
	@GetMapping("/cart/checkout")
	public String checkoutProduct() {
		return "checkout";
	}
	
}
