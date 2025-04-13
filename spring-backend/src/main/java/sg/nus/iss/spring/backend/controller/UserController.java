package sg.nus.iss.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.interfacemethods.UserService;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.service.UserServiceImpl;
import java.util.List;

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

    @GetMapping
    public User findUserById(@RequestParam Integer userId) {
        return userService.findUserById(userId);
    }

    @PostMapping
    public User createUser(@RequestParam User user) {
        return userService.createUser(user);
    }

    @PutMapping
    public User updateUser(@RequestParam User user) {
        return userService.editUser(user);
    }

    @DeleteMapping
    public void deleteUserById(@RequestParam Integer userId) {
        userService.deleteUser(userId);
    }
}
