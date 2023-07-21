package pl.janis.komornik.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.janis.komornik.dto.UserDto;
import pl.janis.komornik.entities.User;
import pl.janis.komornik.exception.ElementDoesNotExistException;
import pl.janis.komornik.exception.UserAlreadyExistsException;
import pl.janis.komornik.mapper.UserMapper;
import pl.janis.komornik.repository.UserRepository;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;
    private final EmailService emailService;

    @Transactional
    public User addUser(User user) throws UserAlreadyExistsException {
        if (userRepository.findByMail(user.getMail()) == null) {
            user.setPassword(encoder.encode(user.getPassword()));
            return userRepository.save(user);
        } else {
            throw new UserAlreadyExistsException("Użytkownik z tym mailem już istnieje");
        }
    }

    public List<UserDto> findAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDto).toList();
    }

    @Transactional
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public User editUser(User user) {
        User existingUser = userRepository.findById(user.getId()).orElseThrow(() -> new ElementDoesNotExistException("No results"));
        existingUser.setMail(user.getMail());
        existingUser.setName(user.getName());
        existingUser.setAvatar(user.getAvatar());
        return userRepository.save(user);
    }

    public User findById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new ElementDoesNotExistException("No results"));
    }

    public List<User> findCommonUsers(int userId) {
        return userRepository.findCommonUsers(userId);
    }

    public List<User> findUsersInGroup(int groupId) {
        return userRepository.findUsersInGroups(groupId);
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        final User user = userRepository.findByName(name);
        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("User not exist with name :" + name);
        }
    }

    public UserDto getUserDtoByUserId(int userId) {
        return userMapper.toDto(findById(userId));
    }

    public Integer forgotPassword(User currentUser) {
        User user = userRepository.findByMail(currentUser.getMail());
        if (user != null) {
            final int newPass = new Random().nextInt(999999);
            user.setPassword(encoder.encode(Integer.toString(newPass)));
            userRepository.save(user);
            emailService.sendEmail(user.getMail(), newPass);
            return newPass;
        }
        return null;
    }
}
