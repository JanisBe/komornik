package pl.janis.komornik.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Log4j2
@Component
class ProfileScannerBean {

    private final Environment environment;

    ProfileScannerBean(Environment environment) {
        this.environment = environment;
    }

    @PostConstruct
    void postConstruct() {
        String[] activeProfiles = environment.getActiveProfiles();
        log.info("active profiles: {}", Arrays.toString(activeProfiles));
    }

}
