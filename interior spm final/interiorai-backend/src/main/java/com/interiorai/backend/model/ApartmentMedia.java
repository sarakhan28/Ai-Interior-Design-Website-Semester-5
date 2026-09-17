package com.interiorai.backend.model;

public class ApartmentMedia {
    private String id;
    private String projectId;
    private String userId;
    private String fileName;
    private String originalFileName;
    private String contentType;
    private Long fileSizeBytes;
    private MediaTypeEnum mediaType; // IMAGE or VIDEO
    private String storagePath;
    private String downloadUrl;
    private Long uploadedAt;

    public ApartmentMedia() {}

    public ApartmentMedia(String id, String projectId, String userId, String fileName, 
                          String originalFileName, String contentType, Long fileSizeBytes, 
                          MediaTypeEnum mediaType, String storagePath, String downloadUrl, Long uploadedAt) {
        this.id = id;
        this.projectId = projectId;
        this.userId = userId;
        this.fileName = fileName;
        this.originalFileName = originalFileName;
        this.contentType = contentType;
        this.fileSizeBytes = fileSizeBytes;
        this.mediaType = mediaType;
        this.storagePath = storagePath;
        this.downloadUrl = downloadUrl;
        this.uploadedAt = uploadedAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

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

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public String getDownloadUrl() { return downloadUrl; }
    public void setDownloadUrl(String downloadUrl) { this.downloadUrl = downloadUrl; }

    public Long getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(Long uploadedAt) { this.uploadedAt = uploadedAt; }
}
