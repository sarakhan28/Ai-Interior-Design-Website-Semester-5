package com.interiorai.backend.repository;

import com.interiorai.backend.model.ProjectHistory;

import java.util.List;

public interface ProjectHistoryRepository {
    ProjectHistory save(ProjectHistory history);
    List<ProjectHistory> findByProjectIdOrderByTimestampDesc(String projectId);
    List<ProjectHistory> findByUserIdOrderByTimestampDesc(String userId, int limit);
}
