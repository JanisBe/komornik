package pl.janis.komornik.dto;

public record DebtDto(UserDto from, UserDto to, float amount) {
}
