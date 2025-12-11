import React, { useState } from "react";
import { SectionCard, Input } from "./common";

function ConsumerTab({
  batches,
  getCropName,
  getFarmerName,
  getTraceForBatch,
  getAnomalyInfoForBatch,
}) {
  const [id, setId] = useState("");

  const batch = batches.find((b) => b.batchId === id);
  const trace = batch ? getTraceForBatch(batch.batchId) : [];

  return (
    <SectionCard title="Consumer – Track Your Food">
      <Input
        label="Enter Batch ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      {!batch ? (
        <p>Enter a valid batch ID</p>
      ) : (
        <>
          <h3>Product Info</h3>
          <p>Crop: {getCropName(batch.cropId)}</p>
          <p>Farmer: {getFarmerName(batch.farmerId)}</p>
          <p>Status: {batch.status}</p>
          <p>Location: {batch.currentLocation}</p>

          <h3>Product Journey</h3>
          <ul>
            {trace.map((t) => (
              <li key={t.traceId}>
                <b>{t.eventType}</b> at {t.location} ({t.handledBy})
              </li>
            ))}
          </ul>

          <h3>AI Freshness Check</h3>
          <p>{getAnomalyInfoForBatch(batch.batchId)}</p>
        </>
      )}
    </SectionCard>
  );
}

export default ConsumerTab;
