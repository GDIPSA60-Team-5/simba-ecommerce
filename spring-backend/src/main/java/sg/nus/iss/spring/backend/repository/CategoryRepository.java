package sg.nus.iss.spring.backend.repository;

import org.springframework.data.repository.CrudRepository;
import sg.nus.iss.spring.backend.model.Category;

public interface CategoryRepository extends CrudRepository<Category, Integer> {

}
