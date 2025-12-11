package com.farmchainx.farmchainx.repository;

import com.farmchainx.farmchainx.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropRepository extends JpaRepository<Crop, Long> {
}
