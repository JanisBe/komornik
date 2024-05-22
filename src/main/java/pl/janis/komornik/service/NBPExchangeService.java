package pl.janis.komornik.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.janis.komornik.dto.ExchangeRateResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class NBPExchangeService {

    public BigDecimal getExchangeRate(BigDecimal amount, String currency) {
        LocalDate today = LocalDate.now();
        String formattedDate = today.format(DateTimeFormatter.ISO_LOCAL_DATE);
        String url = String.format("https://api.nbp.pl/api/exchangerates/rates/a/%s/%s/?format=json", currency, formattedDate);
        RestTemplate restTemplate = new RestTemplate();
        ExchangeRateResponse result = restTemplate.getForObject(url, ExchangeRateResponse.class);
        if (result != null) {
            return result.rates()[0].mid().multiply(amount);
        }
        return BigDecimal.ONE;
    }
}
