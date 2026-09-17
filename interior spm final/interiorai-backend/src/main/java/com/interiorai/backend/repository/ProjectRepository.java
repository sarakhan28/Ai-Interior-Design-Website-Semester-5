package com.interiorai.backend.repository;

import com.interiorai.backend.model.Project;
import com.interiorai.backend.model.ProjectStatus;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository {
    Project save(Project project);
    Optional<Project> findById(String id);
    List<Project> findByUserId(String userId);
    void deleteById(String id);
    long countByUserId(String userId);
    long countByUserIdAndStatus(String userId, ProjectStatus status);
}
