package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.interfacemethods.CategoryService;
import sg.nus.iss.spring.backend.model.Category;
import sg.nus.iss.spring.backend.service.CategoryServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/Categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    public void setListService(CategoryServiceImpl categoryServiceImpl) {
        this.categoryService = categoryServiceImpl;
    }

    @GetMapping
    public List<Category> findAllCategories() {
        return categoryService.findAllCategories();
    }

    @GetMapping
    public Category findCategoryById(@RequestParam Integer categoryId) {
        return categoryService.findCategoryById(categoryId);
    }

    @PostMapping
    public Category createCategory(@RequestParam Category category) {
        return categoryService.createCategory(category);
    }

    @PutMapping
    public Category editCategory(@RequestParam Category category) {
        return categoryService.editCategory(category);
    }

    @DeleteMapping
    public void deleteCategory(@RequestParam Integer categoryId) {
        categoryService.deleteCategory(categoryId);
    }
}
