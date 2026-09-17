package com.interiorai.backend.dto;

import com.interiorai.backend.model.ApartmentMedia;
import com.interiorai.backend.model.MediaTypeEnum;

public class MediaUploadResponse {
    private String id;
    private String projectId;
    private String fileName;
    private String originalFileName;
    private String contentType;
    private Long fileSizeBytes;
    private MediaTypeEnum mediaType;
    private String downloadUrl;
    private Long uploadedAt;

    public static MediaUploadResponse from(ApartmentMedia media) {
        MediaUploadResponse r = new MediaUploadResponse();
        r.setId(media.getId());
        r.setProjectId(media.getProjectId());
        r.setFileName(media.getFileName());
        r.setOriginalFileName(media.getOriginalFileName());
        r.setContentType(media.getContentType());
        r.setFileSizeBytes(media.getFileSizeBytes());
        r.setMediaType(media.getMediaType());
        r.setDownloadUrl(media.getDownloadUrl());
        r.setUploadedAt(media.getUploadedAt());
        return r;
    }

    public MediaUploadResponse() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getOriginalFileName() { return originalFileName; }
    public void setOriginalFileName(String originalFileName) { this.originalFileName = originalFileName; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getFileSizeBytes() { return fileSizeBytes; }
    public void setFileSizeBytes(Long fileSizeBytes) { this.fileSizeBytes = fileSizeBytes; }

    public MediaTypeEnum getMediaType() { return mediaType; }
    public void setMediaType(MediaTypeEnum mediaType) { this.mediaType = mediaType; }

    public String getDownloadUrl() { return downloadUrl; }
    public void setDownloadUrl(String downloadUrl) { this.downloadUrl = downloadUrl; }

    public Long getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(Long uploadedAt) { this.uploadedAt = uploadedAt; }
}
