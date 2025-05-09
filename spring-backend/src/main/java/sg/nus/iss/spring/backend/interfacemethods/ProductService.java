package sg.nus.iss.spring.backend.interfacemethods;

import org.springframework.data.domain.Page;
import sg.nus.iss.spring.backend.dto.ProductFilterRequestDTO;
import sg.nus.iss.spring.backend.model.Product;

import java.util.List;

public interface ProductService {
    Page<Product> list(ProductFilterRequestDTO filter);

    Product findProductById(Integer productId);

    Product createProduct(Product product);

    Product editProduct(Product product);

    void deleteProduct(Integer productId);
}
