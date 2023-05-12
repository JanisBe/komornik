package com.example.demo.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.example.demo.entities.User} entity
 */
public record UserDto(Integer id,
                      String name,
                      String mail,
                      String password,
                      String avatar) implements Serializable {

}
