import React, { useState } from "react";
import {
  SectionCard,
  Input,
  Select,
  PrimaryButton,
  tableStyle,
} from "./common";

function BatchesTab({
  batches,
  crops,
  farmers,
  onAddBatch,
  getFarmerName,
  getCropName,
  currentUser,
}) {
  const [form, setForm] = useState({
    cropId: "",
    farmerId: currentUser?.role === "FARMER" ? currentUser?.farmerId : "",
    quantity: "",
    harvestDate: "",
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.cropId || !form.farmerId)
      return alert("Fill all fields");

    onAddBatch(form);

    setForm({
      cropId: "",
      farmerId: currentUser?.role === "FARMER" ? currentUser?.farmerId : "",
      quantity: "",
      harvestDate: "",
    });
  };

  // Farmer options: admin sees all, farmer sees only self
  const farmerOptions =
    currentUser.role === "ADMIN"
      ? farmers
      : farmers.filter(f => f.farmerId === currentUser.farmerId);

  // Batches visible: admin sees all, farmer sees only own
  const visibleBatches =
    currentUser.role === "ADMIN"
      ? batches
      : batches.filter(b => b.farmerId === currentUser.farmerId);

  return (
    <>
      <SectionCard title="Create Batch">
        <form onSubmit={submit}>
          <Select
            label="Crop"
            value={form.cropId}
            onChange={(e) => setForm({ ...form, cropId: e.target.value })}
          >
            <option value="">Select Crop</option>
            {crops.map((c) => (
              <option key={c.cropId} value={c.cropId}>
                {c.name}
              </option>
            ))}
          </Select>

          <Select
            label="Farmer"
            value={form.farmerId}
            onChange={(e) => setForm({ ...form, farmerId: e.target.value })}
            disabled={currentUser.role === "FARMER"}
          >
            <option value="">Select Farmer</option>
            {farmerOptions.map((f) => (
              <option key={f.farmerId} value={f.farmerId}>
                {f.farmerId} – {f.name}
              </option>
            ))}
          </Select>

          <Input
            label="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <Input
            label="Harvest Date"
            type="date"
            value={form.harvestDate}
            onChange={(e) =>
              setForm({ ...form, harvestDate: e.target.value })
            }
          />

          <PrimaryButton type="submit">Create Batch</PrimaryButton>
        </form>
      </SectionCard>

      <SectionCard title="All Batches">
        {!visibleBatches.length ? (
          <p>No batches found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Crop</th>
                <th>Farmer ID</th>
                <th>Farmer Name</th>
                <th>Qty</th>
                <th>Harvest Date</th>
                <th>Status</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {visibleBatches.map((b) => (
                <tr key={b.batchId}>
                  <td>{b.batchId}</td>
                  <td>{getCropName(b.cropId)}</td>
                  <td>{b.farmerId}</td>
                  <td>{getFarmerName(b.farmerId)}</td>
                  <td>{b.quantity}</td>
                  <td>{b.harvestDate}</td>
                  <td>{b.status}</td>
                  <td>{b.currentLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>
    </>
  );
}

export default BatchesTab;
