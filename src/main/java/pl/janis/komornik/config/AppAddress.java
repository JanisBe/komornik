package pl.janis.komornik.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app")
@Data
public class AppAddress {

    private String address;
}
