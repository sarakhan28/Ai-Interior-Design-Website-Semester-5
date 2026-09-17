package com.interiorai.backend.security;

import com.interiorai.backend.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {}

    public static FirebaseUserPrincipal getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof FirebaseAuthenticationToken token) {
            return token.getPrincipal();
        }
        throw new UnauthorizedException("User is not authenticated. Please provide a valid Firebase ID token.");
    }

    public static String getCurrentUserId() {
        return getCurrentUser().getUid();
    }
}
