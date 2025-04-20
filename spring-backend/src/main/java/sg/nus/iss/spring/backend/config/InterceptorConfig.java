package sg.nus.iss.spring.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import sg.nus.iss.spring.backend.Interceptor.SecurityInterceptor;

@Component
public class InterceptorConfig implements WebMvcConfigurer{
    @Autowired
    SecurityInterceptor securityInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // This interceptor only takes care of the URL paths stated below
        registry.addInterceptor(securityInterceptor)
                .addPathPatterns("/api/orders/*","/api/cart/*","/api/cart");

    }
}
