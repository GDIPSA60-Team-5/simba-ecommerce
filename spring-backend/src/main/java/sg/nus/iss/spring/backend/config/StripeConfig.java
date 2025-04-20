package sg.nus.iss.spring.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.stripe.Stripe;

import jakarta.annotation.PostConstruct;


/* Written By Aung Myin Moe */
@Configuration
public class StripeConfig {
	@Value("${stripe.secret.key}")
	private String stripeSecretKey;
	
	@PostConstruct
	public void init() {
		Stripe.apiKey = stripeSecretKey;
	}
}
