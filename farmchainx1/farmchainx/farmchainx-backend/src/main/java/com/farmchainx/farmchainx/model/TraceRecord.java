package com.farmchainx.farmchainx.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class TraceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    public ProductBatch batch;

    public LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    public TraceEventType eventType;

    public String location;

    public String handledBy;

    public TraceRecord() {}
}
