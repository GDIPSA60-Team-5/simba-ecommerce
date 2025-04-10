package sg.nus.iss.spring.backend.interfaceMethods;

import sg.nus.iss.spring.backend.model.Product;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    List<Product>  list(Integer categoryId, BigDecimal minPrice, BigDecimal maxPrice, String keywords);

}
