package com.farmchainx.farmchainx.controller;

import com.farmchainx.farmchainx.model.Crop;
import com.farmchainx.farmchainx.model.Farmer;
import com.farmchainx.farmchainx.repository.CropRepository;
import com.farmchainx.farmchainx.repository.FarmerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "*")
public class CropController {

    private final CropRepository cropRepo;
    private final FarmerRepository farmerRepo;

    public CropController(CropRepository cropRepo, FarmerRepository farmerRepo) {
        this.cropRepo = cropRepo;
        this.farmerRepo = farmerRepo;
    }

    @GetMapping
    public List<Crop> getAll() {
        return cropRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestParam Long farmerId,
                                    @RequestBody Crop crop) {
        Farmer farmer = farmerRepo.findById(farmerId).orElse(null);
        if (farmer == null) return ResponseEntity.badRequest().body("Farmer not found");

        crop.farmer = farmer;
        return ResponseEntity.ok(cropRepo.save(crop));
    }
}
