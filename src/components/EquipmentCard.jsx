// src/components/EquipmentCard.jsx
import { useState } from "react";

export default function EquipmentCard({ equipment, onBook }) {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // format YYYY-MM-DD
  });
  const [endDate, setEndDate] = useState("");

  const handleBook = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    onBook(equipment, startDate, endDate);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "15px",
        margin: "10px",
        width: "250px",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{equipment.name}</h3>
      <p>
        <strong>Category:</strong> {equipment.category}
      </p>
      <p>
        <strong>Condition:</strong> {equipment.condition}
      </p>
      <p>
        <strong>Quantity:</strong> {equipment.quantity}
      </p>
      <p>
        <strong>Available:</strong> {equipment.available ? "Yes" : "No"}
      </p>

      {/*Show date pickers if item is available */}
      {equipment.available && (
        <>
          <div style={{ marginBottom: "10px" }}>
            <label>
              <strong>Start Date:</strong>
            </label>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]} // restrict to today or later
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "90%",
                padding: "6px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              <strong>End Date:</strong>
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate} // end date must be same or after start date
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: "90%",
                padding: "6px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            onClick={handleBook}
            style={{
              width: "100%",
              padding: "8px 16px",
              backgroundColor: "#081711ff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Book Item
          </button>
        </>
      )}
    </div>
  );
}
