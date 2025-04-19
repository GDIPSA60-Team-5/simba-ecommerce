package sg.nus.iss.spring.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sg.nus.iss.spring.backend.model.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p WHERE " +
            "(:categoryId IS NULL OR p.category.id = :categoryId) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND (:keywords IS NULL OR :keywords = '' OR " +
            "p.name LIKE %:keywords% OR " +
            "p.category.name LIKE %:keywords% OR " +
            "(TYPE(p) = Book AND LOWER(TREAT(p AS Book).author.name) LIKE %:keywords%))")
    Page<Product> searchProductsUsingFilters(@Param("categoryId") Integer categoryId,
                                             @Param("minPrice") Float minPrice,
                                             @Param("maxPrice") Float maxPrice,
                                             @Param("keywords") String keywords,
                                             Pageable pageable);


    Product findProductById(@Param("productId") Integer id);

    void deleteProductByCategoryId(Integer categoryId);
}
