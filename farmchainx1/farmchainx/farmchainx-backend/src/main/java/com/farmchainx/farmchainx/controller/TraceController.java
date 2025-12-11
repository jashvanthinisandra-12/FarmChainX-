package com.farmchainx.farmchainx.controller;

import com.farmchainx.farmchainx.dto.BatchDtos.CreateTraceRequest;
import com.farmchainx.farmchainx.model.*;
import com.farmchainx.farmchainx.repository.ProductBatchRepository;
import com.farmchainx.farmchainx.repository.TraceRecordRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/trace")
@CrossOrigin(origins = "*")
public class TraceController {

    private final ProductBatchRepository batchRepo;
    private final TraceRecordRepository traceRepo;

    public TraceController(ProductBatchRepository batchRepo, TraceRecordRepository traceRepo) {
        this.batchRepo = batchRepo;
        this.traceRepo = traceRepo;
    }

    @GetMapping("/batch/{batchCode}")
    public ResponseEntity<?> getTraceForBatch(@PathVariable String batchCode) {
        var batchOpt = batchRepo.findByBatchCode(batchCode);
        if (batchOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Batch not found");
        }
        ProductBatch batch = batchOpt.get();
        List<TraceRecord> history = traceRepo.findByBatchOrderByTimestampAsc(batch);
        return ResponseEntity.ok(history);
    }

    @PostMapping
    public ResponseEntity<?> addTrace(@RequestBody CreateTraceRequest req) {
        var batchOpt = batchRepo.findByBatchCode(req.batchCode);
        if (batchOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Batch not found");
        }
        ProductBatch batch = batchOpt.get();

        TraceRecord tr = new TraceRecord();
        tr.batch = batch;
        tr.timestamp = LocalDateTime.now();
        tr.eventType = TraceEventType.valueOf(req.eventType);
        tr.location = req.location;
        tr.handledBy = req.handledBy;
        traceRepo.save(tr);

        // update batch status + location
        batch.currentLocation = req.location;
        batch.status = switch (tr.eventType) {
            case TRANSPORT -> BatchStatus.TRANSPORT;
            case WAREHOUSE_IN -> BatchStatus.WAREHOUSE_IN;
            case WAREHOUSE_OUT -> BatchStatus.WAREHOUSE_OUT;
            case DELIVERED -> BatchStatus.DELIVERED;
            case HARVEST -> BatchStatus.HARVESTED;
        };
        batchRepo.save(batch);

        return ResponseEntity.ok(tr);
    }
}
