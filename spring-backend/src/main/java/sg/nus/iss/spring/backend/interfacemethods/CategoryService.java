package sg.nus.iss.spring.backend.interfacemethods;

import sg.nus.iss.spring.backend.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> findAllCategory();
    Category findCategoryById(Integer categoryId);
    Category createCategory(Category category);
    Category editCategory(Category category);
    void deleteCategory(Integer categoryId);
}
