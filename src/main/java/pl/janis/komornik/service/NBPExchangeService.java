package pl.janis.komornik.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import pl.janis.komornik.dto.DebtDto;
import pl.janis.komornik.dto.ExchangeRateResponse;

import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
public class NBPExchangeService {

    public List<DebtDto> getExchangeRate(List<DebtDto> debts) throws RestClientException {
        LocalDate today = LocalDate.now().minusDays(1);
        String formattedDate = today.format(DateTimeFormatter.ISO_LOCAL_DATE);
        List<DebtDto> result = new ArrayList<>();
        debts.forEach(amount -> {
            String url = String.format("https://api.nbp.pl/api/exchangerates/rates/a/%s/%s/?format=json", amount.currency(), formattedDate);
            RestTemplate restTemplate = new RestTemplate();
            ExchangeRateResponse response = restTemplate.getForObject(url, ExchangeRateResponse.class);
            if (response != null) {
                result.add(new DebtDto(amount.from(), amount.to(), response.rates()[0].mid().multiply(amount.amount()).setScale(2, RoundingMode.DOWN), amount.currency()));
            }
        });
        return result;
    }
}
