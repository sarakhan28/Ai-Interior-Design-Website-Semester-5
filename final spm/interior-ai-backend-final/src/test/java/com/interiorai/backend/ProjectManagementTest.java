package com.interiorai.backend;

import com.interiorai.backend.dto.CreateProjectRequest;
import com.interiorai.backend.dto.UpdateProjectRequest;
import com.interiorai.backend.exception.ForbiddenAccessException;
import com.interiorai.backend.model.Project;
import com.interiorai.backend.model.ProjectHistory;
import com.interiorai.backend.model.ProjectStatus;
import com.interiorai.backend.service.ProjectService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProjectManagementTest {

    @Autowired
    private ProjectService projectService;

    @Test
    @DisplayName("Verify Project CRUD and Strict Ownership Isolation (ADWP-62-68)")
    void testProjectLifecycleAndSecurity() {
        String userA = "test-user-a";
        String userB = "test-user-b";

        // 1. Create Project by User A
        CreateProjectRequest createReq = new CreateProjectRequest();
        createReq.setName("Mumbai Seaface 3BHK");
        createReq.setRoomType("Living Room");
        createReq.setApartmentType("3BHK");
        createReq.setCarpetAreaSqFt(350.0);
        createReq.setTargetBudget(500000.0);
        createReq.setStyle("Indian Contemporary");

        Project created = projectService.createProject(createReq, userA);
        assertNotNull(created.getId());
        assertEquals("Mumbai Seaface 3BHK", created.getName());
        assertEquals(userA, created.getUserId());
        assertEquals(ProjectStatus.DRAFT, created.getStatus());

        // 2. User A can retrieve project
        Project fetched = projectService.getProject(created.getId(), userA);
        assertEquals(created.getId(), fetched.getId());

        // 3. User B CANNOT access User A's project (Ownership Enforcement)
        assertThrows(ForbiddenAccessException.class, () -> {
            projectService.getProject(created.getId(), userB);
        }, "Cross-user access must throw ForbiddenAccessException");

        // 4. Update Project
        UpdateProjectRequest updateReq = new UpdateProjectRequest();
        updateReq.setName("Mumbai Seaface 3BHK - Redesigned");
        updateReq.setStatus(ProjectStatus.IN_PROGRESS);
        Project updated = projectService.updateProject(created.getId(), updateReq, userA);
        assertEquals("Mumbai Seaface 3BHK - Redesigned", updated.getName());
        assertEquals(ProjectStatus.IN_PROGRESS, updated.getStatus());

        // 5. Activity History is recorded
        List<ProjectHistory> history = projectService.getProjectHistory(created.getId(), userA);
        assertFalse(history.isEmpty(), "Audit history should be recorded for project changes");
        assertTrue(history.stream().anyMatch(h -> "PROJECT_CREATED".equals(h.getAction())));
    }
}
