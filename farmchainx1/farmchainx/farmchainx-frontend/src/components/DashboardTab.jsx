import React from "react";
import { SectionCard, tableStyle } from "./common";
import ChatbotWidget from "./chatbot/ChatbotWidget";

function DashboardTab({
  farmers = [],
  crops = [],
  batches = [],
  traceRecords = [],
  getCropName = () => "",
  getFarmerName = () => "",
  currentUser = {},
}) {
  const role = currentUser?.role || "ADMIN";
  const farmerId = currentUser?.farmerId || null;

  const visibleFarmers =
    role === "FARMER" ? farmers.filter((f) => f.farmerId === farmerId) : farmers;

  const visibleBatches =
    role === "FARMER" ? batches.filter((b) => b.farmerId === farmerId) : batches;

  const visibleCrops =
    role === "FARMER"
      ? crops.filter((c) =>
          visibleBatches.some((b) => b.cropId === c.cropId)
        )
      : crops;

  const visibleTraces = traceRecords.filter(
    (t) =>
      (role === "FARMER"
        ? visibleBatches.some((b) => b.batchId === t.batchId)
        : true) && t.eventType !== "HARVEST"
  );

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      
      {/* LEFT SIDE CONTENT */}
      <div style={{ flex: 1 }}>
        <SectionCard title="System Overview">
          <p>Total Farmers: <b>{visibleFarmers.length}</b></p>
          <p>Total Crops: <b>{visibleCrops.length}</b></p>
          <p>Total Batches: <b>{visibleBatches.length}</b></p>
          <p>Total Trace Records: <b>{visibleTraces.length}</b></p>
        </SectionCard>

        <SectionCard title="Recent Batches">
          {visibleBatches.length === 0 ? (
            <p>No batches created yet.</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Crop</th>
                  <th>Farmer</th>
                  <th>Status</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {visibleBatches.slice(-5).map((b) => (
                  <tr key={b.batchId}>
                    <td>{b.batchId}</td>
                    <td>{getCropName(b.cropId)}</td>
                    <td>{getFarmerName(b.farmerId)}</td>
                    <td>{b.status}</td>
                    <td>{b.currentLocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </SectionCard>
      </div>

      {/* RIGHT SIDE CHATBOT */}
      <div style={{ width: "350px", position: "sticky", top: "20px" }}>
        <ChatbotWidget />
      </div>

    </div>
  );
}

export default DashboardTab;
