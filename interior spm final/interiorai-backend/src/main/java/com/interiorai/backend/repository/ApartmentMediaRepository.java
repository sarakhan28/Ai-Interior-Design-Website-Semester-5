package com.interiorai.backend.repository;

import com.interiorai.backend.model.ApartmentMedia;

import java.util.List;
import java.util.Optional;

public interface ApartmentMediaRepository {
    ApartmentMedia save(ApartmentMedia media);
    Optional<ApartmentMedia> findById(String id);
    List<ApartmentMedia> findByProjectId(String projectId);
    void deleteById(String id);
}
