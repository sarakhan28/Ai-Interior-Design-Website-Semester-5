package com.interiorai.backend.repository;

import com.interiorai.backend.model.ProjectBudget;

import java.util.Optional;

public interface ProjectBudgetRepository {
    ProjectBudget save(ProjectBudget budget);
    Optional<ProjectBudget> findByProjectId(String projectId);
    void deleteByProjectId(String projectId);
}
