package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.interfacemethods.ProductService;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.service.ProductServiceImpl;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    public void setListService(ProductServiceImpl productServiceImpl) {
        this.productService = productServiceImpl;
    }

    //get product page
    @GetMapping
    public List<Product> findAllProducts(@RequestParam(required = false) Integer categoryId,
                                        @RequestParam(required = false) BigDecimal minPrice,
                                        @RequestParam(required = false) BigDecimal maxPrice,
                                        @RequestParam(required = false) String keywords) {
        return productService.list(categoryId, minPrice, maxPrice, keywords);
    }

    @GetMapping
    public Product findProductById(@RequestParam Integer id) {
        return productService.findProductById(id);
    }

    @PostMapping
    public Product createProduct(@RequestParam Product product) {
        return productService.createProduct(product);
    }

    @PutMapping
    public Product editProduct(@RequestParam Product product) {
        return productService.editProduct(product);
    }

    @DeleteMapping
    public void deleteProduct(@RequestParam Product product) {
        productService.deleteProduct(product.getId());
    }

}
