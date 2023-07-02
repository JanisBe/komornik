package pl.janis.komornik.dto;

import pl.janis.komornik.entities.User;

import java.io.Serializable;

/**
 * A DTO for the {@link User} entity
 */
public record UserDto(Integer id,
                      String name,
                      String mail,
                      String avatar,
                      String token) implements Serializable {

    public UserDto withToken(String token) {
        return new UserDto(id, name, mail, avatar, token);
    }

}
