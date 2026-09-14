package com.interiorai.backend.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class FirebaseTokenFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(FirebaseTokenFilter.class);

    private final FirebaseAuth firebaseAuth;
    private final boolean mockEnabled;

    public FirebaseTokenFilter(@org.springframework.beans.factory.annotation.Autowired(required = false) FirebaseAuth firebaseAuth,
                               @Value("${firebase.mock.enabled:true}") boolean mockEnabled) {
        this.firebaseAuth = firebaseAuth;
        this.mockEnabled = mockEnabled;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = extractBearerToken(request);

        if (StringUtils.hasText(token)) {
            try {
                FirebaseUserPrincipal principal = authenticateToken(token);
                if (principal != null) {
                    FirebaseAuthenticationToken authentication = new FirebaseAuthenticationToken(principal, token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    log.debug("Authenticated Firebase user UID: {}", principal.getUid());
                }
            } catch (Exception e) {
                log.warn("Failed to verify Firebase token: {}", e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }

    private String extractBearerToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return header.substring(7).trim();
        }
        return null;
    }

    private FirebaseUserPrincipal authenticateToken(String token) throws Exception {
        // Support dev/mock mode tokens for local testing and offline runs
        if (mockEnabled && (firebaseAuth == null || token.startsWith("dev-") || token.startsWith("mock-") || token.equals("test-token"))) {
            return buildMockPrincipal(token);
        }

        // Real Firebase Token verification via Firebase Admin SDK
        if (firebaseAuth != null) {
            FirebaseToken decodedToken = firebaseAuth.verifyIdToken(token);
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();
            String name = decodedToken.getName();
            String picture = decodedToken.getPicture();
            return new FirebaseUserPrincipal(uid, email, name, picture);
        }

        // Fallback in mock mode
        if (mockEnabled) {
            return buildMockPrincipal(token);
        }

        throw new IllegalStateException("Firebase Admin SDK is not initialized and mock mode is disabled");
    }

    private FirebaseUserPrincipal buildMockPrincipal(String token) {
        String uid = "dev-user-123";
        if (token.startsWith("dev-token-") || token.startsWith("mock-token-")) {
            uid = token.replace("dev-token-", "").replace("mock-token-", "");
        } else if (token.length() > 6 && !token.equals("test-token")) {
            uid = "user-" + Math.abs(token.hashCode() % 100000);
        }
        return new FirebaseUserPrincipal(uid, uid + "@interiorai.studio", "Studio Designer", null);
    }
}
