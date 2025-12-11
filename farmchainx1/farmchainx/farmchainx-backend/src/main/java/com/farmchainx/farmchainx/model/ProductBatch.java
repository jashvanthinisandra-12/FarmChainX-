package com.farmchainx.farmchainx.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class ProductBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    // For mapping with React: something like "BATCH-ABC123"
    @Column(unique = true)
    public String batchCode;

    @ManyToOne
    @JoinColumn(name = "crop_id")
    public Crop crop;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    public Farmer farmer;

    public Double quantity;

    public LocalDate harvestDate;

    @Enumerated(EnumType.STRING)
    public BatchStatus status;

    public String currentLocation;

    public ProductBatch() {}
}
