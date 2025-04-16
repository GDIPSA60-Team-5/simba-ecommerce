package sg.nus.iss.spring.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sg.nus.iss.spring.backend.interfacemethods.CategoryService;
import sg.nus.iss.spring.backend.model.Category;
import sg.nus.iss.spring.backend.repository.CategoryRepository;
import sg.nus.iss.spring.backend.repository.ProductRepository;

import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Category> findAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findCategoryById(Integer categoryId) {
        return categoryRepository.findCategoryById(categoryId);
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category editCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        productRepository.deleteProductByCategoryId(categoryId);
        categoryRepository.deleteById(categoryId);
    }
}
