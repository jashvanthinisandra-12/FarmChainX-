package com.farmchainx.farmchainx.dto;

import java.time.LocalDate;

public class BatchDtos {

    public static class CreateBatchRequest {
        public Long cropId;
        public Long farmerId;
        public Double quantity;
        public LocalDate harvestDate;
    }

    public static class CreateTraceRequest {
        public String batchCode;
        public String eventType; // TRANSPORT / WAREHOUSE_IN / WAREHOUSE_OUT / DELIVERED
        public String location;
        public String handledBy;
    }
}
