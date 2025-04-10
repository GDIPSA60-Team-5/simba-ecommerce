package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
