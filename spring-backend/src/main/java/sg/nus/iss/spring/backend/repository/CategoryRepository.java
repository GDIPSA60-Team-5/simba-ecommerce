package sg.nus.iss.spring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.nus.iss.spring.backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
