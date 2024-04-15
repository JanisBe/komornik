package pl.janis.komornik.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OAuth2LoginController {
    @GetMapping("/login/oauth2/code/{registrationId}")
    public String handleOAuth2Login(@PathVariable String registrationId,
                                    @AuthenticationPrincipal OAuth2User principal) {
        // Access user information from the OAuth2User principal
        // ... (e.g., save to your user database, redirect, etc.)
        return "Login successful!";
    }
}
