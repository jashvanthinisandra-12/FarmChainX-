package com.farmchainx.farmchainx.controller;

import com.farmchainx.farmchainx.model.Farmer;
import com.farmchainx.farmchainx.repository.FarmerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmers")
@CrossOrigin(origins = "*")
public class FarmerController {

    private final FarmerRepository farmerRepo;

    public FarmerController(FarmerRepository farmerRepo) {
        this.farmerRepo = farmerRepo;
    }

    @GetMapping
    public List<Farmer> getAll() {
        return farmerRepo.findAll();
    }

    @PostMapping
    public Farmer create(@RequestBody Farmer f) {
        return farmerRepo.save(f);
    }
}
