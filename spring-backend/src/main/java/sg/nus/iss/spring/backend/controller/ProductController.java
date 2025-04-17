package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.dto.ProductFilterRequestDTO;
import sg.nus.iss.spring.backend.interfacemethods.ProductService;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.service.ProductServiceImpl;
import java.util.List;

/* Written By Li Xing Bang */
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private ProductService productService;

    @Autowired
    public void setProductService(ProductServiceImpl productServiceImpl) {
        this.productService = productServiceImpl;
    }

    @GetMapping
    public List<Product> findAllProducts(ProductFilterRequestDTO filters) {
        return productService.list(filters);
    }

    @GetMapping("/{id}")
    public Product findProductById(@PathVariable("id") Integer id) {
        return productService.findProductById(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PutMapping("/{id}")
    public Product editProduct(@RequestBody Product product, @PathVariable("id") Integer id) {
        product.setId(id);
        return productService.editProduct(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable("id") Integer id) {
        productService.deleteProduct(id);
    }

}
