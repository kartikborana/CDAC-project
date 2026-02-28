package com.restaurant.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.restaurant.entity.Role;
import com.restaurant.entity.User;
import com.restaurant.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * Called after Google verifies the user.
 * Finds the existing user in DB, or auto-creates one with role=CUSTOMER.
 */
@Service
@Slf4j
public class OAuthUserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) {
        // Call Google's userinfo endpoint to get the profile
        OAuth2User oauthUser = super.loadUser(request);

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        log.info("OAuth2 login attempt for email: {}", email);

        // Find existing user OR auto-register as CUSTOMER
        userRepository.findByEmail(email).orElseGet(() -> {
            log.info("New OAuth2 user — auto-registering: {}", email);
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name != null ? name : email.split("@")[0]);
            newUser.setRole(Role.CUSTOMER);
            // OAuth users have no password — sentinel value stored
            newUser.setPasswordHash("OAUTH_NO_PASSWORD");
            return userRepository.save(newUser);
        });

        return oauthUser;
    }
}
