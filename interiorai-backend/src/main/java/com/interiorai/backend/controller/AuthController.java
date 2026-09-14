package com.interiorai.backend.controller;

import com.interiorai.backend.dto.ApiResponse;
import com.interiorai.backend.dto.UserProfileResponse;
import com.interiorai.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication (ADWP-44–53)", description = "Firebase token verification and user profile management")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/me")
    @Operation(summary = "Get Current User Profile", description = "Retrieves profile of the authenticated Firebase user identified by ID token UID")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getCurrentUser() {
        UserProfileResponse profile = authService.getCurrentUserProfile();
        return ResponseEntity.ok(ApiResponse.ok("User profile retrieved successfully", profile));
    }

    @PostMapping("/verify")
    @Operation(summary = "Validate Session / Token", description = "Verifies active session or Firebase ID token")
    public ResponseEntity<ApiResponse<UserProfileResponse>> verifySession() {
        UserProfileResponse profile = authService.getCurrentUserProfile();
        return ResponseEntity.ok(ApiResponse.ok("Firebase session is valid", profile));
    }
}
