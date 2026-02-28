package com.restaurant.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.restaurant.entity.User;
import com.restaurant.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

/**
 * Runs after Google login succeeds.
 * Issues our own JWT and redirects the browser to the frontend with the token.
 */
@Component
@Slf4j
public class OAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Value("${app.oauth2.redirectUri}")
    private String redirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");

        log.info("OAuth2 login success for: {}", email);

        // Fetch user from DB (guaranteed to exist — OAuthUserService created it)
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("OAuth user not found: " + email));

        // Generate our own JWT — same format as normal login
        String token = jwtUtils.generateToken(
                user.getEmail(),
                user.getId(),
                user.getRole().name());

        // Redirect frontend to /oauth2/success?token=<jwt>
        String targetUrl = redirectUri + "?token=" + token;
        log.info("Redirecting OAuth2 user to frontend: {}", targetUrl);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
