package pl.janis.komornik.config;

import jakarta.servlet.Filter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import pl.janis.komornik.filter.CsrfCookieFilter;
import pl.janis.komornik.service.UserService;

import java.util.Collections;
import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    private final Filter jwtAuthFilter;
    private final UserService userService;

    public SecurityConfig(@Lazy Filter jwtAuthFilter, @Lazy UserService userService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userService = userService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName("_csrf");

        http.securityContext(context -> context.requireExplicitSave(false))
                .csrf(csrf -> csrf.csrfTokenRequestHandler(requestHandler)
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .ignoringRequestMatchers("/auth/authenticate", "/user/save", "/user/verifyUser/", "/user/forgotPassword/"))
                .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
//                .cors(Customizer.withDefaults())
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowCredentials(true);
                    corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:4401"));
                    corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
                    corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
                    corsConfiguration.setExposedHeaders(List.of("Authorization"));
                    return corsConfiguration;
                }))
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/auth/authenticate").permitAll();
                    auth.requestMatchers("/user/save").permitAll();
                    auth.requestMatchers("/user/verifyUser/").permitAll();
                    auth.requestMatchers("/user/forgotPassword/").permitAll();
                    auth.requestMatchers("/actuator/**").permitAll();
                    auth.requestMatchers("/error").permitAll();
                    auth.requestMatchers("/").permitAll();
                    auth.requestMatchers(
                                    HttpMethod.GET,
                                    "/index*", "/static/**", "/*.js", "/*.css", "/*.json", "/*.ico")
                            .permitAll();
                    auth.requestMatchers(HttpMethod.OPTIONS).permitAll();
                    auth.anyRequest().authenticated();
                })
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .headers((headers) -> headers.frameOptions(FrameOptionsConfig::disable));

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        final DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
