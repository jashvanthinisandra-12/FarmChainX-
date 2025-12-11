package com.farmchainx.farmchainx.repository;

import com.farmchainx.farmchainx.model.ProductBatch;
import com.farmchainx.farmchainx.model.TraceRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TraceRecordRepository extends JpaRepository<TraceRecord, Long> {
    List<TraceRecord> findByBatchOrderByTimestampAsc(ProductBatch batch);
}
