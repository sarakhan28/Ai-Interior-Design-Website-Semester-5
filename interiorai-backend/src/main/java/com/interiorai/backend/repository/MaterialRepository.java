package com.interiorai.backend.repository;

import com.interiorai.backend.model.MaterialCategory;
import com.interiorai.backend.model.MaterialItem;

import java.util.List;
import java.util.Optional;

public interface MaterialRepository {
    MaterialItem save(MaterialItem item);
    List<MaterialItem> saveAll(List<MaterialItem> items);
    Optional<MaterialItem> findById(String id);
    List<MaterialItem> findAll();
    List<MaterialItem> findByCategory(MaterialCategory category);
    long count();
}
