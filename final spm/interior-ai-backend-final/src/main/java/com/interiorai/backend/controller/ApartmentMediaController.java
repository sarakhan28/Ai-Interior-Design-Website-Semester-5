package com.interiorai.backend.controller;

import com.interiorai.backend.dto.ApiResponse;
import com.interiorai.backend.dto.MediaUploadResponse;
import com.interiorai.backend.model.ApartmentMedia;
import com.interiorai.backend.security.SecurityUtils;
import com.interiorai.backend.service.ApartmentMediaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/media")
@Tag(name = "Apartment Media (ADWP-69–75)", description = "Video walkthrough and image upload, format/size validation, Firebase Storage, and retrieval")
public class ApartmentMediaController {

    private final ApartmentMediaService mediaService;

    public ApartmentMediaController(ApartmentMediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload Apartment Media", description = "Uploads a room walkthrough video (up to 100MB) or photo (up to 15MB) to Firebase Storage and registers metadata in Firestore")
    public ResponseEntity<ApiResponse<MediaUploadResponse>> uploadMedia(
            @PathVariable String projectId,
            @RequestParam("file") MultipartFile file) throws IOException {

        String userId = SecurityUtils.getCurrentUserId();
        MediaUploadResponse response = mediaService.uploadMedia(projectId, file, userId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Media uploaded successfully", response));
    }

    @GetMapping
    @Operation(summary = "List Project Media", description = "Retrieves all media files associated with this project")
    public ResponseEntity<ApiResponse<List<MediaUploadResponse>>> getProjectMedia(@PathVariable String projectId) {
        String userId = SecurityUtils.getCurrentUserId();
        List<MediaUploadResponse> list = mediaService.getProjectMedia(projectId, userId);
        return ResponseEntity.ok(ApiResponse.ok("Project media list retrieved", list));
    }

    @GetMapping("/{mediaId}")
    @Operation(summary = "Get Media Details", description = "Retrieves metadata and download URL for a specific media file")
    public ResponseEntity<ApiResponse<ApartmentMedia>> getMediaById(@PathVariable String projectId,
                                                                    @PathVariable String mediaId) {
        String userId = SecurityUtils.getCurrentUserId();
        ApartmentMedia media = mediaService.getMediaById(projectId, mediaId, userId);
        return ResponseEntity.ok(ApiResponse.ok("Media details retrieved", media));
    }

    @DeleteMapping("/{mediaId}")
    @Operation(summary = "Delete Media", description = "Deletes a media item from the project")
    public ResponseEntity<ApiResponse<Void>> deleteMedia(@PathVariable String projectId,
                                                         @PathVariable String mediaId) {
        String userId = SecurityUtils.getCurrentUserId();
        mediaService.deleteMedia(projectId, mediaId, userId);
        return ResponseEntity.ok(ApiResponse.ok("Media deleted successfully", null));
    }
}
