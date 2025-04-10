package sg.nus.iss.spring.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sg.nus.iss.spring.backend.interfaceMethods.ProductService;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> list(Integer categoryId, BigDecimal minPrice, BigDecimal maxPrice, String keywords) {
        if ((categoryId==null) && (minPrice == null) && (maxPrice == null) && keywords==null) {
            return productRepository.findAll();
        }else {
            return productRepository.searchProducts(categoryId, minPrice, maxPrice,
                    keywords );
        }

    }

}
