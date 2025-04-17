package sg.nus.iss.spring.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sg.nus.iss.spring.backend.dto.ProductFilterRequestDTO;
import sg.nus.iss.spring.backend.interfacemethods.ProductService;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> list(ProductFilterRequestDTO filters) {
        String sortBy = (filters.getSortBy() == null || filters.getSortBy().isBlank())
                ? "name"
                : filters.getSortBy();

        String sortDir = (filters.getSortDir() == null || filters.getSortDir().isBlank())
                ? "ASC"
                : filters.getSortDir().toUpperCase();
        int pageNo = (filters.getPageNo() == null || filters.getPageNo() < 1) ? 0 : filters.getPageNo() - 1;
        int itemsPerPage = (filters.getItemsPerPage() == null || filters.getItemsPerPage() <= 0) ? 10 : filters.getItemsPerPage();

        Sort.Direction direction = Sort.Direction.fromString(sortDir.toUpperCase());

        Sort sort = Sort.by(direction, sortBy);
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
