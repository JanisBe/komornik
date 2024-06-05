package pl.janis.komornik.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
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
    LocalDate today = LocalDate.now();


    public List<DebtDto> getExchangeRate(List<DebtDto> debts) throws RestClientException {

        List<DebtDto> result = new ArrayList<>();
        debts.forEach(amount -> {
            try {
                DebtDto response = callNbpApi(amount);
                if (response != null) {
                    result.add(response);
                }
            } catch (HttpClientErrorException e) {
                throw new RuntimeException(e);
            }
        });
        return result;
    }

    private DebtDto callNbpApi(DebtDto amount) {
        int retryCount = 0;
        DebtDto result = null;
        int MAX_RETRIES = 5;
        while (retryCount < MAX_RETRIES) {
            String formattedDate = today.format(DateTimeFormatter.ISO_LOCAL_DATE);
            String url = String.format("https://api.nbp.pl/api/exchangerates/rates/a/%s/%s/?format=json", amount.currency(), formattedDate);
            RestTemplate restTemplate = new RestTemplate();
            try {
                ExchangeRateResponse response = restTemplate.getForObject(url, ExchangeRateResponse.class);
                if (response != null) {
                    result = new DebtDto(amount.from(), amount.to(), response.rates()[0].mid().multiply(amount.amount()).setScale(2, RoundingMode.DOWN), "PLN");
                    break;
                }
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                    today = today.minusDays(1);
                    retryCount++;
                } else {
                    throw e;
                }
            }
        }
        return result;
    }
}
