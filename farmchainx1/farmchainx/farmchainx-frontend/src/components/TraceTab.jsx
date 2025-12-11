import React, { useState, useEffect } from "react";
import { SectionCard, Input, Select, PrimaryButton } from "./common";

function TraceTab({
  batches = [],
  farmers = [],
  onAddTrace,
  getCropName,
  getFarmerName,
  getTraceForBatch,
  getAnomalyInfoForBatch,
  currentUser = {},
}) {
  const role = currentUser.role || "ADMIN";
  const loggedFarmerId = currentUser.farmerId || null;

  const [form, setForm] = useState({
    farmerId: role === "FARMER" ? loggedFarmerId : "",
    batchId: "",
    eventType: "",
    location: "",
    handledBy: "",
  });

  const [visibleBatches, setVisibleBatches] = useState([]);
  const [search, setSearch] = useState("");

  // Update batch options based on selected farmer
  useEffect(() => {
    if (role === "FARMER") {
      setVisibleBatches(batches.filter((b) => b.farmerId === loggedFarmerId));
    } else {
      setVisibleBatches(
        batches.filter((b) =>
          form.farmerId ? b.farmerId === form.farmerId : true
        )
      );
    }
  }, [batches, form.farmerId, role, loggedFarmerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onAddTrace(form);
    if (!result.ok) return alert(result.message);

    alert("Trace record added");
    setForm({
      farmerId: role === "FARMER" ? loggedFarmerId : "",
      batchId: "",
      eventType: "",
      location: "",
      handledBy: "",
    });
  };

  const batch = batches.find((b) => b.batchId === search);
  const trace = batch ? getTraceForBatch(batch.batchId) : [];

  return (
    <>
      <SectionCard title="Add Trace Record">
        <form onSubmit={handleSubmit}>
          {/* Farmer select first */}
          <Select
            label="Farmer"
            value={form.farmerId}
            onChange={(e) => setForm({ ...form, farmerId: e.target.value, batchId: "" })}
            disabled={role === "FARMER"} // FARMER cannot change
          >
            {role === "ADMIN" && <option value="">Select Farmer</option>}
            {farmers.map((f) => (
              <option key={f.farmerId} value={f.farmerId}>
                {f.farmerId} – {f.name}
              </option>
            ))}
          </Select>

          {/* Batch select */}
          <Select
            label="Batch"
            value={form.batchId}
            onChange={(e) => setForm({ ...form, batchId: e.target.value })}
          >
            <option value="">Choose Batch</option>
            {visibleBatches.map((b) => (
              <option key={b.batchId} value={b.batchId}>
                {b.batchId} – {getCropName(b.cropId)}
              </option>
            ))}
          </Select>

          <Select
            label="Event Type"
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
          >
            <option value="">Select Event</option>
            <option value="TRANSPORT">Transport</option>
            <option value="WAREHOUSE_IN">Warehouse In</option>
            <option value="WAREHOUSE_OUT">Warehouse Out</option>
            <option value="DELIVERED">Delivered</option>
          </Select>

          <Input
            label="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <Input
            label="Handled By"
            value={form.handledBy}
            onChange={(e) => setForm({ ...form, handledBy: e.target.value })}
          />

          <PrimaryButton type="submit">Add Trace</PrimaryButton>
        </form>
      </SectionCard>

      <SectionCard title="Track Batch">
        <Input
          label="Enter Batch ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {!batch ? (
          <p>Enter a valid Batch ID</p>
        ) : (
          <>
            <h3>Batch Summary</h3>
            <p>Crop: {getCropName(batch.cropId)}</p>
            <p>Farmer: {getFarmerName(batch.farmerId)}</p>
            <p>Status: {batch.status}</p>
            <p>Location: {batch.currentLocation}</p>

            <h3>Trace Timeline</h3>
            <ul>
              {trace.map((t) => (
                <li key={t.traceId}>
                  <b>{t.eventType}</b> → {t.location} ({t.handledBy})
                </li>
              ))}
            </ul>

            <h3>AI Anomaly Check:</h3>
            <p>{getAnomalyInfoForBatch(batch.batchId)}</p>
          </>
        )}
      </SectionCard>
    </>
  );
}

export default TraceTab;
