package pl.janis.komornik.dto;

import java.math.BigDecimal;

public record Rate(
        String no,
        String effectiveDate,
        BigDecimal mid
) {
}
