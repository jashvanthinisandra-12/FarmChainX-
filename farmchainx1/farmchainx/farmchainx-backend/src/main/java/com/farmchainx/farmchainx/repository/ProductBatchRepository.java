package com.farmchainx.farmchainx.repository;

import com.farmchainx.farmchainx.model.ProductBatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductBatchRepository extends JpaRepository<ProductBatch, Long> {
    Optional<ProductBatch> findByBatchCode(String batchCode);
}
