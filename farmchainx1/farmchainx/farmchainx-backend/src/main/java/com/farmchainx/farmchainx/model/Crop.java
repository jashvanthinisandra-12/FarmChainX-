package com.farmchainx.farmchainx.model;

import jakarta.persistence.*;

@Entity
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;
    public String season;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    public Farmer farmer;

    public Crop() {}

    public Crop(String name, String season, Farmer farmer) {
        this.name = name;
        this.season = season;
        this.farmer = farmer;
    }
}
