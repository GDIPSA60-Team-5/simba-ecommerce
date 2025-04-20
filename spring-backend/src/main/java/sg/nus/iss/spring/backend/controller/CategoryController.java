package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.interfacemethods.CategoryService;
import sg.nus.iss.spring.backend.model.Category;
import sg.nus.iss.spring.backend.service.CategoryServiceImpl;

import java.util.List;

/* Written By Li Xing Bang */
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    public void setListService(CategoryServiceImpl categoryServiceImpl) {
        this.categoryService = categoryServiceImpl;
    }

    @GetMapping
    public List<Category> findAllCategory() {
        return categoryService.findAllCategory();
    }

    @GetMapping("/{id}")
    public Category findCategoryBy(@PathVariable("id") Integer id) {
        return categoryService.findCategoryById(id);
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @PutMapping("/{id}")
    public Category editCategory(@RequestBody Category category, @PathVariable("id") Integer id) {
        category.setId(id);
        return categoryService.editCategory(category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable("id") Integer categoryId) {
        categoryService.deleteCategory(categoryId);
    }
}
