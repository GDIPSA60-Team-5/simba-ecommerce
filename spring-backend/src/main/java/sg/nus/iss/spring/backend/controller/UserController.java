package sg.nus.iss.spring.backend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.interfacemethods.UserService;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.service.UserServiceImpl;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/* Written By Li Xing Bang */
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    public void setListService(UserServiceImpl userServiceimpl) {
        this.userService = userServiceimpl;
    }

    @GetMapping
    public List<User> findAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public User findUserById(@PathVariable("id") Integer id) {
        return userService.findUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user, BindingResult result, @PathVariable("id") Integer id) {
        if (result.hasErrors()) {
            String errorMessage = result.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("message", errorMessage));
        }

        user.setId(id);
        User updatedUser = userService.editUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable("id") Integer id) {
        userService.deleteUser(id);
    }
}
