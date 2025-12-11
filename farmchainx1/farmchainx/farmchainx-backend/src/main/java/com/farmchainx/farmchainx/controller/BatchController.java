package com.farmchainx.farmchainx.controller;

import com.farmchainx.farmchainx.dto.BatchDtos.CreateBatchRequest;
import com.farmchainx.farmchainx.model.*;
import com.farmchainx.farmchainx.repository.CropRepository;
import com.farmchainx.farmchainx.repository.FarmerRepository;
import com.farmchainx.farmchainx.repository.ProductBatchRepository;
import com.farmchainx.farmchainx.repository.TraceRecordRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "*")
public class BatchController {

    private final ProductBatchRepository batchRepo;
    private final CropRepository cropRepo;
    private final FarmerRepository farmerRepo;
    private final TraceRecordRepository traceRepo;

    public BatchController(ProductBatchRepository batchRepo,
                           CropRepository cropRepo,
                           FarmerRepository farmerRepo,
                           TraceRecordRepository traceRepo) {
        this.batchRepo = batchRepo;
        this.cropRepo = cropRepo;
        this.farmerRepo = farmerRepo;
        this.traceRepo = traceRepo;
    }

    @GetMapping
    public List<ProductBatch> getAll() {
        return batchRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateBatchRequest req) {
        var crop = cropRepo.findById(req.cropId).orElse(null);
        var farmer = farmerRepo.findById(req.farmerId).orElse(null);

        if (crop == null || farmer == null) {
            return ResponseEntity.badRequest().body("Invalid crop or farmer");
        }

        ProductBatch batch = new ProductBatch();
        batch.batchCode = "BATCH-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        batch.crop = crop;
        batch.farmer = farmer;
        batch.quantity = req.quantity;
        batch.harvestDate = req.harvestDate;
        batch.status = BatchStatus.HARVESTED;
        batch.currentLocation = farmer.location;

        batch = batchRepo.save(batch);

        // Initial HARVEST trace
        TraceRecord tr = new TraceRecord();
        tr.batch = batch;
        tr.timestamp = LocalDateTime.now();
        tr.eventType = TraceEventType.HARVEST;
        tr.location = batch.currentLocation;
        tr.handledBy = farmer.name;
        traceRepo.save(tr);

        return ResponseEntity.ok(batch);
    }
}
