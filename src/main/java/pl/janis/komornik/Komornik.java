package pl.janis.komornik;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class Komornik {

    public static void main(String[] args) {
        SpringApplication.run(Komornik.class, args);
    }

}
