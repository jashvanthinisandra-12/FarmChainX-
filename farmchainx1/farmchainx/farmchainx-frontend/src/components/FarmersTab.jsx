import React, { useState } from "react";
import { SectionCard, Input, PrimaryButton, tableStyle } from "./common";

function FarmersTab({ farmers = [], onAddFarmer, currentUser = {}, farmerChanges = [] }) {
  const role = currentUser.role || "ADMIN";
  const loggedFarmerId = currentUser.farmerId || null;

  // Load only the current farmer if role = FARMER
  const currentFarmer =
    role === "FARMER"
      ? farmers.find((f) => f.farmerId === loggedFarmerId)
      : null;

  const [form, setForm] = useState({
    name: currentFarmer?.name || currentFarmer?.username || "",
    location: currentFarmer?.location || "",
    contact: currentFarmer?.contact || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.location || !form.contact) {
      alert("Please fill all fields");
      return;
    }

    onAddFarmer(form); // Updates if farmer, creates new if admin
    alert("Saved successfully!");
  };

  // Which farmers to show in table?
  const visibleFarmers =
    role === "ADMIN"
      ? farmers
      : farmers.filter((f) => f.farmerId === loggedFarmerId);

  // Admin-only: Flatten change history into table rows
  const changeHistoryRows =
    role === "ADMIN"
      ? farmerChanges.map((log) => {
          const farmer = farmers.find((f) => f.farmerId === log.farmerId);
          return {
            ...farmer,
            timestamp: log.timestamp,
            changedBy: log.changedBy,
          };
        })
      : [];

  return (
    <>
      <SectionCard title={role === "ADMIN" ? "Add Farmer" : "Your Farmer Profile"}>
        <form onSubmit={handleSubmit}>
          <Input
            label="Farmer Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <Input
            label="Contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />

          <PrimaryButton type="submit">
            {role === "ADMIN" ? "Add Farmer" : "Save Changes"}
          </PrimaryButton>
        </form>
      </SectionCard>

      <SectionCard title="Farmer Details">
        {!visibleFarmers.length ? (
          <p>No farmers found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Farmer ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {visibleFarmers.map((f) => (
                <tr key={f.farmerId}>
                  <td>{f.farmerId}</td>
                  <td>{f.name || f.username}</td>
                  <td>{f.location || "-"}</td>
                  <td>{f.contact || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>

      {/* Admin-only: Farmer Change History with same structure + Timestamp & Changed By */}
      {role === "ADMIN" && changeHistoryRows.length > 0 && (
        <SectionCard title="Farmer Change History">
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Farmer ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Changed By</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {changeHistoryRows.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.farmerId}</td>
                  <td>{row.name || row.username}</td>
                  <td>{row.location || "-"}</td>
                  <td>{row.contact || "-"}</td>
                  <td>{row.changedBy}</td>
                  <td>{new Date(row.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      )}
    </>
  );
}

export default FarmersTab;
