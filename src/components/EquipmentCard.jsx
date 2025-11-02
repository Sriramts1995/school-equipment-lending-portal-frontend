// src/components/EquipmentCard.jsx
import { useState, useEffect } from "react";

export default function EquipmentCard({
  equipment,
  onBook,
  requestStatus,
  currentUser,
}) {
  const storageKeyStart = `startDate_${currentUser?.id || "guest"}_${
    equipment.id
  }`;
  const storageKeyEnd = `endDate_${currentUser?.id || "guest"}_${equipment.id}`;

  const savedStart = localStorage.getItem(storageKeyStart);
  const savedEnd = localStorage.getItem(storageKeyEnd);

  const [startDate, setStartDate] = useState(
    savedStart || new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(savedEnd || "");

  // persist dates
  useEffect(() => {
    localStorage.setItem(storageKeyStart, startDate);
    localStorage.setItem(storageKeyEnd, endDate);
  }, [startDate, endDate, storageKeyStart, storageKeyEnd]);

  const handleBook = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    onBook(equipment, startDate, endDate);
  };

  const getButtonConfig = () => {
    switch (requestStatus?.toUpperCase()) {
      case "PENDING":
        return { label: "Pending", color: "#ccc", disabled: true };
      case "APPROVED":
        return { label: "Return", color: "#1a73e8", disabled: false };
      default:
        return { label: "Book Item", color: "#081711", disabled: false };
    }
  };

  const { label, color, disabled } = getButtonConfig();
  const isBookedOrPending = ["APPROVED", "PENDING"].includes(
    requestStatus?.toUpperCase()
  );

  // only set endDate for approved/pending if not already present
  useEffect(() => {
    if (isBookedOrPending) {
      if (!endDate && savedEnd) setEndDate(savedEnd);
    } else {
      // new booking — clear end date
      setEndDate("");
    }
  }, [isBookedOrPending]);

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
        <strong>Condition:</strong> {equipment.conditiontype}
      </p>
      <p>
        <strong>Available Quantity:</strong> {equipment.quantity}
      </p>
      <p>
        <strong>Available:</strong> {equipment.available ? "Yes" : "No"}
      </p>

      {equipment.available && (
        <>
          <div style={{ marginBottom: "10px" }}>
            <label>
              <strong>Start Date:</strong>
            </label>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
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
              min={startDate}
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
            onClick={!disabled ? handleBook : undefined}
            disabled={disabled}
            style={{
              width: "100%",
              padding: "8px 16px",
              backgroundColor: color,
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            {label}
          </button>
        </>
      )}
    </div>
  );
}
