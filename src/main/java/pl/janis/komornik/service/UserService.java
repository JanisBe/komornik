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
import pl.janis.komornik.exception.UserNotAllowedToEditException;
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
    public UserDto addUser(User user) throws UserAlreadyExistsException {
        if (userRepository.findByMail(user.getMail()) == null) {
            user.setPassword(encoder.encode(user.getPassword()));
            return userMapper.toDto(userRepository.save(user));
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
    public UserDto editUser(User user, User currentUser) {
        if (!user.getId().equals(currentUser.getId())) {
            throw new UserNotAllowedToEditException("Nie możesz edytować tego użytkownika");
        }
        User existingUser = userRepository.findById(user.getId()).orElseThrow(() -> new ElementDoesNotExistException("No results"));
        existingUser.setMail(user.getMail());
        existingUser.setName(user.getName());
        existingUser.setAvatar(user.getAvatar());
        return userMapper.toDto(userRepository.save(user));
    }

    public User findById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new ElementDoesNotExistException("No results"));
    }

    public List<UserDto> findCommonUsers(int userId) {
        return userRepository.findCommonUsers(userId).stream().map(userMapper::toDto).toList();
    }

    public List<UserDto> findUsersInGroup(int groupId) {
        return userRepository.findUsersInGroups(groupId).stream().map(userMapper::toDto).toList();
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
            if (user.getName().equals(currentUser.getName())) {
                final int newPass = new Random().nextInt(999999);
                user.setPassword(encoder.encode(Integer.toString(newPass)));
                userRepository.save(user);
                emailService.resetPasswordEmail(user.getMail(), newPass);
                return newPass;
            } else
                throw new UserNotAllowedToEditException("Login " + currentUser.getName() + " i mail " + currentUser.getMail() + " nie pasują");
        }
        throw new UsernameNotFoundException("Nie znaleziono użytkownika o mailu " + currentUser.getMail());
    }

    public String verify(int userId, String token) {
        User newUser = userRepository.findById(userId).orElseThrow(() -> new ElementDoesNotExistException("Nie ma takiego użytkownika"));
        if (newUser.getVerificationToken().equals(token)) {
            newUser.setVerified(true);
            userRepository.save(newUser);
            return "Użytkownik został zatwierdzony";
        }
        return "Nieprawidłowy token";
    }
}
