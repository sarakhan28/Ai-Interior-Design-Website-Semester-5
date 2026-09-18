package com.interiorai.backend.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;

public class FirebaseAuthenticationToken extends AbstractAuthenticationToken {

    private final FirebaseUserPrincipal principal;
    private final String credentials; // The raw ID token

    public FirebaseAuthenticationToken(FirebaseUserPrincipal principal, String credentials) {
        super(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return credentials;
    }

    @Override
    public FirebaseUserPrincipal getPrincipal() {
        return principal;
    }
}
