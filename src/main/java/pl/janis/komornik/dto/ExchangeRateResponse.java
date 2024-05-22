package pl.janis.komornik.dto;

public record ExchangeRateResponse(
        String table,
        String currency,
        String code,
        Rate[] rates
) {
}
