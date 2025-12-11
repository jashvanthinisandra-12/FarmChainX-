package com.farmchainx.farmchainx.repository;

import com.farmchainx.farmchainx.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {
}
