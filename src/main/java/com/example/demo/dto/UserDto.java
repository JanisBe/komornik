package com.example.demo.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.example.demo.entities.User} entity
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
