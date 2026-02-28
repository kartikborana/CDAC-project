package com.restaurant.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final CustomJwtFilter jwtFilter;
    private final CustomUserDetailsServiceImpl userDetailsService;
    private final CorsConfigurationSource corsConfigurationSource;
    private final OAuthUserService oAuthUserService;
    private final OAuthSuccessHandler oAuthSuccessHandler;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // REST API → no CSRF
                .csrf(csrf -> csrf.disable())

                // Enable CORS with configuration source
                .cors(cors -> cors.configurationSource(corsConfigurationSource))

                // OAuth2 needs sessions briefly (for the redirect handshake), then we go
                // stateless
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))

                // Authorization rules
                .authorizeHttpRequests(auth -> auth
                        // Standard auth endpoints
                        .requestMatchers("/api/auth/login",
                                "/api/auth/register-customer",
                                "/api/auth/register-staff",
                                "/api/auth/register-admin")
                        .permitAll()
                        // OAuth2 endpoints — must be public
                        .requestMatchers("/oauth2/**", "/login/oauth2/**").permitAll()
                        // Public API endpoints
                        .requestMatchers("/api/categories/**").permitAll()
                        .requestMatchers("/api/food-items/**").permitAll()
                        .requestMatchers("/api/users/email/**").permitAll()
                        .requestMatchers("/api/users").permitAll()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll()
                        .anyRequest().authenticated())

                // JWT filter for all normal API requests
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                // Google OAuth2 Login
                .oauth2Login(oauth -> oauth
                        .userInfoEndpoint(u -> u.userService(oAuthUserService))
                        .successHandler(oAuthSuccessHandler));

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
