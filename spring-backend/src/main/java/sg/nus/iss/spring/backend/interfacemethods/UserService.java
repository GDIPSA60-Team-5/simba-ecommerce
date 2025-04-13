package sg.nus.iss.spring.backend.interfacemethods;

import sg.nus.iss.spring.backend.model.User;

import java.util.List;

public interface UserService {
    List<User> findAllUsers();
    User findUserById(Integer userId);
    User createUser(User user);
    User editUser(User user);
    void deleteUser(Integer userId);
}
