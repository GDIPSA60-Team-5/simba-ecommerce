package sg.nus.iss.spring.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sg.nus.iss.spring.backend.dto.ProductFilterRequestDTO;
import sg.nus.iss.spring.backend.interfacemethods.ProductService;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.repository.ProductRepository;
import sg.nus.iss.spring.backend.util.ResourceQueryUtils;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public Page<Product> list(ProductFilterRequestDTO filters) {

        Sort.Direction direction = Sort.Direction.fromString(filters.getSortDir().toUpperCase());
        Sort sort = Sort.by(direction, filters.getSortBy());

        int pageNo = ResourceQueryUtils.sanitizePageNo(filters.getPageNo());
        int itemsPerPage = ResourceQueryUtils.sanitizeItemsPerPage(filters.getItemsPerPage());

        Pageable pageable = PageRequest.of(pageNo, itemsPerPage, sort);

        return productRepository.searchProductsUsingFilters(
                filters.getCategoryId(),
                filters.getMinPrice(),
                filters.getMaxPrice(),
                filters.getKeywords(),
                pageable
        );
    }

    @Override
    public Product findProductById(Integer productId) {
        return productRepository.findProductById(productId);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product editProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Integer productId) {
        productRepository.deleteById(productId);
    }

}
