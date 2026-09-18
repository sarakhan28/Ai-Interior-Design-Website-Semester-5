package com.interiorai.backend.service;

import com.interiorai.backend.dto.DashboardStatsResponse;
import com.interiorai.backend.dto.ProjectResponse;
import com.interiorai.backend.model.Project;
import com.interiorai.backend.model.ProjectHistory;
import com.interiorai.backend.model.ProjectStatus;
import com.interiorai.backend.repository.ProjectHistoryRepository;
import com.interiorai.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final ProjectHistoryRepository historyRepository;

    public DashboardService(ProjectRepository projectRepository, ProjectHistoryRepository historyRepository) {
        this.projectRepository = projectRepository;
        this.historyRepository = historyRepository;
    }

    public DashboardStatsResponse getStats(String userId) {
        List<Project> userProjects = projectRepository.findByUserId(userId);

        DashboardStatsResponse stats = new DashboardStatsResponse();
        stats.setTotalProjects(userProjects.size());

        long draft = 0, inProgress = 0, completed = 0, archived = 0;
        double totalBudget = 0.0;

        for (Project p : userProjects) {
            if (p.getStatus() == ProjectStatus.DRAFT) draft++;
            else if (p.getStatus() == ProjectStatus.IN_PROGRESS) inProgress++;
            else if (p.getStatus() == ProjectStatus.COMPLETED) completed++;
            else if (p.getStatus() == ProjectStatus.ARCHIVED) archived++;

            if (p.getBudget() != null && p.getBudget().getGrandTotal() != null) {
                totalBudget += p.getBudget().getGrandTotal();
            } else if (p.getTargetBudget() != null) {
                totalBudget += p.getTargetBudget();
            }
        }

        stats.setDraftCount(draft);
        stats.setInProgressCount(inProgress);
        stats.setCompletedCount(completed);
        stats.setArchivedCount(archived);
        stats.setTotalEstimatedBudget(totalBudget);

        List<ProjectResponse> recent = userProjects.stream()
                .limit(5)
                .map(ProjectResponse::from)
                .collect(Collectors.toList());
        stats.setRecentProjects(recent);

        List<ProjectHistory> recentActivities = historyRepository.findByUserIdOrderByTimestampDesc(userId, 10);
        stats.setRecentActivities(recentActivities);

        return stats;
    }
}
