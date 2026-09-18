package com.interiorai.backend.model;

public class ProjectHistory {
    private String id;
    private String projectId;
    private String userId;
    private String action; // e.g. CREATED, UPDATED, MEDIA_UPLOADED, QUESTIONNAIRE_SAVED, BUDGET_CALCULATED, REPORT_GENERATED
    private String description;
    private Long timestamp;

    public ProjectHistory() {}

    public ProjectHistory(String id, String projectId, String userId, String action, String description, Long timestamp) {
        this.id = id;
        this.projectId = projectId;
        this.userId = userId;
        this.action = action;
        this.description = description;
        this.timestamp = timestamp;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getTimestamp() { return timestamp; }
    public void setTimestamp(Long timestamp) { this.timestamp = timestamp; }
}
