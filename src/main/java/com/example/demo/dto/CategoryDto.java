package com.example.demo.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.example.demo.entities.Category} entity
 */
public record CategoryDto(Integer id, String name) implements Serializable {

}
