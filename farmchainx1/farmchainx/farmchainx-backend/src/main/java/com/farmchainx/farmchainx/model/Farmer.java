package com.farmchainx.farmchainx.model;

import jakarta.persistence.*;

@Entity
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;
    public String location;
    public String contact;

    public Farmer() {}

    public Farmer(String name, String location, String contact) {
        this.name = name;
        this.location = location;
        this.contact = contact;
    }
}
