// src/components/RequestsApproveReject.jsx
import { useState } from "react";

export default function RequestsApproveReject({ equipment, onapprove, onreject }) {
  const approveItem = () => {
    onapprove(equipment);
  };

  const rejectItem = () => {
    onreject(equipment);
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

      <p>
        <button
          onClick={approveItem}
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
          Approve
        </button>
      </p>
      <p>
        <button
          onClick={rejectItem}
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
          Reject
        </button>
      </p>
    </div>
  );
}
