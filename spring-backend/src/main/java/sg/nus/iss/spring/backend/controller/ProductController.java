package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.interfacemethods.ProductService;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.service.ProductServiceImpl;
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
                                        @RequestParam(required = false) Float minPrice,
                                        @RequestParam(required = false) Float maxPrice,
                                        @RequestParam(required = false) String keywords) {
        return productService.list(categoryId, minPrice, maxPrice, keywords);
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
