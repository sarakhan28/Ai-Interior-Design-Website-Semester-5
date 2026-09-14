package com.interiorai.backend.dto;

import com.interiorai.backend.model.ProjectHistory;

import java.util.ArrayList;
import java.util.List;

public class DashboardStatsResponse {
    private long totalProjects = 0;
    private long draftCount = 0;
    private long inProgressCount = 0;
    private long completedCount = 0;
    private long archivedCount = 0;
    private double totalEstimatedBudget = 0.0;
    private List<ProjectResponse> recentProjects = new ArrayList<>();
    private List<ProjectHistory> recentActivities = new ArrayList<>();

    public DashboardStatsResponse() {}

    public long getTotalProjects() { return totalProjects; }
    public void setTotalProjects(long totalProjects) { this.totalProjects = totalProjects; }

    public long getDraftCount() { return draftCount; }
    public void setDraftCount(long draftCount) { this.draftCount = draftCount; }

    public long getInProgressCount() { return inProgressCount; }
    public void setInProgressCount(long inProgressCount) { this.inProgressCount = inProgressCount; }

    public long getCompletedCount() { return completedCount; }
    public void setCompletedCount(long completedCount) { this.completedCount = completedCount; }

    public long getArchivedCount() { return archivedCount; }
    public void setArchivedCount(long archivedCount) { this.archivedCount = archivedCount; }

    public double getTotalEstimatedBudget() { return totalEstimatedBudget; }
    public void setTotalEstimatedBudget(double totalEstimatedBudget) { this.totalEstimatedBudget = totalEstimatedBudget; }

    public List<ProjectResponse> getRecentProjects() { return recentProjects; }
    public void setRecentProjects(List<ProjectResponse> recentProjects) { this.recentProjects = recentProjects; }

    public List<ProjectHistory> getRecentActivities() { return recentActivities; }
    public void setRecentActivities(List<ProjectHistory> recentActivities) { this.recentActivities = recentActivities; }
}
