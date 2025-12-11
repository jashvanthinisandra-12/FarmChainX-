import React, { useState } from "react";
import {
  SectionCard,
  Input,
  Select,
  PrimaryButton,
  tableStyle,
} from "./common";

function CropsTab({
  crops,
  farmers,
  onAddCrop,
  getFarmerName,
  getPredictedYieldForCrop,
  currentUser = {},
}) {
  const [form, setForm] = useState({
    name: "",
    season: "",
    farmerId: currentUser?.role === "FARMER" ? currentUser?.farmerId : "",
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.farmerId) return alert("Please fill all fields");

    onAddCrop({
      ...form,
      timestamp: new Date().toISOString(), // Add timestamp when adding crop
    });

    setForm({
      name: "",
      season: "",
      farmerId: currentUser?.role === "FARMER" ? currentUser?.farmerId : "",
    });
  };

  const farmerOptions =
    currentUser?.role === "ADMIN"
      ? farmers
      : farmers.filter((f) => f.farmerId === currentUser?.farmerId);

  const visibleCrops =
    currentUser?.role === "ADMIN"
      ? crops
      : crops.filter((c) => c.farmerId === currentUser?.farmerId);

  // Format timestamp
  const formatTimestamp = (ts) => new Date(ts).toLocaleString("en-US", {
    hour12: true,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });

  return (
    <>
      <SectionCard title="Add Crop">
        <form onSubmit={submit}>
          <Input
            label="Crop Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            label="Season"
            value={form.season}
            onChange={(e) => setForm({ ...form, season: e.target.value })}
          />

          <Select
            label="Farmer"
            value={form.farmerId}
            onChange={(e) => setForm({ ...form, farmerId: e.target.value })}
            disabled={currentUser?.role === "FARMER"}
          >
            <option value="">Select Farmer</option>
            {farmerOptions.map((f) => (
              <option value={f.farmerId} key={f.farmerId}>
                {f.farmerId} – {f.name} – {f.location}
              </option>
            ))}
          </Select>

          <PrimaryButton type="submit">Add Crop</PrimaryButton>
        </form>
      </SectionCard>

      <SectionCard title="All Crops">
        {!visibleCrops.length ? (
          <p>No crops added.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Crop ID</th>
                <th>Crop Name</th>
                <th>Season</th>
                <th>Farmer ID</th>
                <th>Farmer Name</th>
                {currentUser.role === "ADMIN" && <th>Timestamp</th>}
                <th>AI Yield</th>
              </tr>
            </thead>
            <tbody>
              {visibleCrops.map((c) => (
                <tr key={c.cropId}>
                  <td>{c.cropId}</td>
                  <td>{c.name}</td>
                  <td>{c.season}</td>
                  <td>{c.farmerId}</td>
                  <td>{getFarmerName(c.farmerId)}</td>
                  {currentUser.role === "ADMIN" && (
                    <td>{formatTimestamp(c.timestamp)}</td>
                  )}
                  <td>{getPredictedYieldForCrop(c.cropId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>
    </>
  );
}

export default CropsTab;
