package com.interiorai.backend.service;

import com.interiorai.backend.dto.MediaUploadResponse;
import com.interiorai.backend.exception.ForbiddenAccessException;
import com.interiorai.backend.exception.ResourceNotFoundException;
import com.interiorai.backend.model.ApartmentMedia;
import com.interiorai.backend.model.MediaTypeEnum;
import com.interiorai.backend.model.Project;
import com.interiorai.backend.repository.ApartmentMediaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApartmentMediaService {

    private static final Logger log = LoggerFactory.getLogger(ApartmentMediaService.class);

    private final ApartmentMediaRepository mediaRepository;
    private final ProjectService projectService;
    private final StorageService storageService;

    public ApartmentMediaService(ApartmentMediaRepository mediaRepository,
                                 ProjectService projectService,
                                 StorageService storageService) {
        this.mediaRepository = mediaRepository;
        this.projectService = projectService;
        this.storageService = storageService;
    }

    public MediaUploadResponse uploadMedia(String projectId, MultipartFile file, String userId) throws IOException {
        // Enforce project ownership
        Project project = projectService.getProject(projectId, userId);

        MediaTypeEnum mediaType = storageService.validateAndGetMediaType(file);
        String downloadUrl = storageService.uploadFile(file, userId, projectId);

        ApartmentMedia media = new ApartmentMedia();
        media.setProjectId(projectId);
        media.setUserId(userId);
        media.setOriginalFileName(file.getOriginalFilename());
        media.setFileName(file.getName());
        media.setContentType(file.getContentType());
        media.setFileSizeBytes(file.getSize());
        media.setMediaType(mediaType);
        media.setStoragePath(downloadUrl);
        media.setDownloadUrl(downloadUrl);
        media.setUploadedAt(System.currentTimeMillis());

        ApartmentMedia saved = mediaRepository.save(media);

        // Associate with project
        if (project.getMediaIds() == null) {
            project.setMediaIds(new java.util.ArrayList<>());
        }
        project.getMediaIds().add(saved.getId());
        if (mediaType == MediaTypeEnum.IMAGE && (project.getOriginalImageUrl() == null || project.getOriginalImageUrl().isEmpty())) {
            project.setOriginalImageUrl(downloadUrl);
        }
        projectService.recordActivity(projectId, userId, "MEDIA_UPLOADED",
                "Uploaded " + mediaType + " (" + file.getOriginalFilename() + ")");

        log.info("Media {} uploaded successfully for project {}", saved.getId(), projectId);
        return MediaUploadResponse.from(saved);
    }

    public List<MediaUploadResponse> getProjectMedia(String projectId, String userId) {
        projectService.getProject(projectId, userId); // verify ownership
        return mediaRepository.findByProjectId(projectId).stream()
                .map(MediaUploadResponse::from)
                .collect(Collectors.toList());
    }

    public ApartmentMedia getMediaById(String projectId, String mediaId, String userId) {
        projectService.getProject(projectId, userId); // verify ownership
        ApartmentMedia media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new ResourceNotFoundException("Media with ID " + mediaId + " not found."));

        if (!media.getProjectId().equals(projectId) || !media.getUserId().equals(userId)) {
            throw new ForbiddenAccessException("You do not have permission to view this media.");
        }
        return media;
    }

    public void deleteMedia(String projectId, String mediaId, String userId) {
        ApartmentMedia media = getMediaById(projectId, mediaId, userId);
        mediaRepository.deleteById(media.getId());
        projectService.recordActivity(projectId, userId, "MEDIA_DELETED", "Deleted media: " + media.getOriginalFileName());
    }
}
