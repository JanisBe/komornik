package com.example.demo.dto;

public record DebtDto(UserDto from, UserDto to, float amount) {
}
