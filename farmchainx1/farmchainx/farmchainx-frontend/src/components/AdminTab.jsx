import React from "react";
import { SectionCard, tableStyle } from "./common";

function AdminTab({
  farmers,
  crops,
  batches,
  traceRecords,
  getCropName,
  getFarmerName,
  getAnomalyInfoForBatch,
}) {
  return (
    <>
      <SectionCard title="Admin Overview">
        <p>Total Farmers: {farmers.length}</p>
        <p>Total Crops: {crops.length}</p>
        <p>Total Batches: {batches.length}</p>
        <p>Total Trace Records: {traceRecords.length}</p>
      </SectionCard>

      <SectionCard title="All Batches – Admin View">
        {!batches.length ? (
          <p>No batches found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Crop</th>
                <th>Farmer</th>
                <th>Status</th>
                <th>Location</th>
                <th>AI Risk</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.batchId}>
                  <td>{b.batchId}</td>
                  <td>{getCropName(b.cropId)}</td>
                  <td>{getFarmerName(b.farmerId)}</td>
                  <td>{b.status}</td>
                  <td>{b.currentLocation}</td>
                  <td>{getAnomalyInfoForBatch(b.batchId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>
    </>
  );
}

export default AdminTab;
