package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sg.nus.iss.spring.backend.interfaceMethods.ProductService;
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
    public List<Product> getProducts(@RequestParam(required = false) Integer categoryId,
                                        @RequestParam(required = false) BigDecimal minPrice,
                                        @RequestParam(required = false) BigDecimal maxPrice,
                                        @RequestParam(required = false) String keywords) {
        return productService.list(categoryId, minPrice, maxPrice, keywords);

    }

}
