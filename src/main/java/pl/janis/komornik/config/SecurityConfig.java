package pl.janis.komornik.config;

import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;
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
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import pl.janis.komornik.config.security.PartitionedCookieLogoutHandler;
import pl.janis.komornik.config.security.PartitionedCookieTokenRepository;
import pl.janis.komornik.filter.CsrfCookieFilter;
import pl.janis.komornik.filter.SpaWebFilter;
import pl.janis.komornik.service.UserService;

import java.util.Collections;
import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    public static final String[] ALLOWED_URLS = {"/auth/authenticate", "/api/auth/authenticate", "/api/user/save", "/api/user/verifyUser/", "/api/user/forgotPassword/", "/api/csrf"};
    private final Filter jwtAuthFilter;
    private final UserService userService;

    public SecurityConfig(@Lazy Filter jwtAuthFilter, @Lazy UserService userService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userService = userService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        PartitionedCookieTokenRepository cookieCsrfTokenRepository = new PartitionedCookieTokenRepository();
        cookieCsrfTokenRepository.setCookieCustomizer(c -> c.secure(true).httpOnly(true).sameSite("none"));
        http.securityContext(context -> context.requireExplicitSave(false))
//                .requiresChannel(channel -> channel.anyRequest().requiresSecure())
                .csrf(csrf -> csrf
                        .csrfTokenRepository(cookieCsrfTokenRepository)
                        .csrfTokenRequestHandler(new MyCsrfTokenRequestHandler())
                        .sessionAuthenticationStrategy(new MyAuthenticationStrategy(cookieCsrfTokenRepository)))
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowCredentials(true);
                    corsConfiguration.setAllowedOrigins(List.of("http://localhost:4401", "https://localhost:8080"));
                    corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
                    corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
                    corsConfiguration.setExposedHeaders(List.of("Authorization", "X-XSRF-TOKEN"));
                    return corsConfiguration;
                }))
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/", "/actuator/**", "/error").permitAll();
                    auth.requestMatchers(ALLOWED_URLS).permitAll();
                    auth.requestMatchers(
                                    HttpMethod.GET,
                                    "/index*", "/assets/**", "/*.js", "/*.css", "/*.json", "/*.ico", "/manifest.webmanifest")
                            .permitAll();
                    auth.requestMatchers(HttpMethod.OPTIONS).permitAll();
                    auth.anyRequest().authenticated();
                })
                .logout(logout -> {
                    logout.logoutUrl("/api/logout");
                    logout.logoutSuccessUrl("/");
                    logout.clearAuthentication(true);
                    logout.permitAll();
                    logout.deleteCookies("XSRF-TOKEN", "accessToken");
                    logout.addLogoutHandler(new PartitionedCookieLogoutHandler("XSRF-TOKEN", "accessToken"));
                    logout.logoutSuccessHandler((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK));
                })
                .headers(headers ->
                        headers
                                .xssProtection(xss -> xss.headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
//                                .contentSecurityPolicy(cps -> cps.policyDirectives("default-src 'none'; img-src * 'self' data: https:; font-src 'self' https:; connect-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' http: https:; object-src 'none';  manifest-src 'self'"))
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new CsrfCookieFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(new SpaWebFilter(), BasicAuthenticationFilter.class)
                .headers((headers) -> headers.frameOptions(FrameOptionsConfig::disable));
//                .oauth2ResourceServer((oauth2) -> oauth2.jwt((jwt) -> jwt.decoder(jwtDecoder())));

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

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowBackSlash(true);
        return (web) -> web.httpFirewall(firewall);
    }

    @Bean
    public TomcatContextCustomizer tomcatContextCustomizer() {
        Rfc6265CookieProcessor cookieProcessor = new Rfc6265CookieProcessor();
        cookieProcessor.setPartitioned(true);
        cookieProcessor.setSameSiteCookies("None");
        return context -> {
            context.setUsePartitioned(true);
            context.setCookieProcessor(cookieProcessor);
        };
    }
}
