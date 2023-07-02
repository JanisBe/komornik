package pl.janis.komornik.entities;

import java.math.BigDecimal;

public record UserBalance(int userId, BigDecimal balance) {
}
