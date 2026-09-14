package com.interiorai.backend.service;

import com.interiorai.backend.dto.UserProfileResponse;
import com.interiorai.backend.security.FirebaseUserPrincipal;
import com.interiorai.backend.security.SecurityUtils;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public UserProfileResponse getCurrentUserProfile() {
        FirebaseUserPrincipal principal = SecurityUtils.getCurrentUser();
        return new UserProfileResponse(
                principal.getUid(),
                principal.getEmail(),
                principal.getName(),
                principal.getPicture(),
                true
        );
    }
}
