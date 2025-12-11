import React, { useState } from "react";
import { SectionCard, Input, Select, PrimaryButton } from "./common";

function DistributorTab({ batches, onAddTrace, getCropName, getFarmerName }) {
  const [form, setForm] = useState({
    batchId: "",
    eventType: "",
    location: "",
    handledBy: "",
  });

  const submit = (e) => {
    e.preventDefault();

    const result = onAddTrace(form);
    if (!result.ok) return alert(result.message);

    alert("Distributor record added!");
    setForm({ batchId: "", eventType: "", location: "", handledBy: "" });
  };

  return (
    <SectionCard title="Distributor Panel">
      <form onSubmit={submit}>
        <Select
          label="Batch"
          value={form.batchId}
          onChange={(e) => setForm({ ...form, batchId: e.target.value })}
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
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
          <option value="">Select</option>
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

        <PrimaryButton type="submit">Update Movement</PrimaryButton>
      </form>
    </SectionCard>
  );
}

export default DistributorTab;
