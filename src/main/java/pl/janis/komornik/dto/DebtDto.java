package pl.janis.komornik.dto;

import java.math.BigDecimal;

public record DebtDto(Integer id, UserDto from, UserDto to, BigDecimal amount, String currency) {
}
