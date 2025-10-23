// //src/pages/Requests.jsx
// export default function Requests() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Borrow/Return Requests</h1>
//       <p>Students can request equipment, staff/admin can approve or reject.</p>
//     </div>
//   );
// }

// src/pages/EquipmentManagement.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EquipmentCard from "../components/RequestsApproveReject";
import { equipmentList } from "../services/api";

export default function EquipmentManagement() {
  const [category, setCategory] = useState("none");
  const navigate = useNavigate();

  const approveItem = () => {
    alert("Item Approval is in progress");
  };

  const rejectItem = () => {
    alert("Item Rejection is in progress");
  };

  // ✅ Filter logic
  const filteredList = equipmentList.filter((item) => {
    if (category === "none" || category === false) return true; // show all
    if (category === "available") return item.available === true; // only available
    return item.category.toLowerCase() === category.toLowerCase(); // match specific category (Sports, Lab, etc.)
  });

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          //justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "12px", // spacing between title and dropdown
        }}
      >
        <h1>Approve/Reject the Requests</h1>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
            cursor: "pointer",
            height: "36px",
          }}
        >
          <option value="none">None</option>
          <option value="Sports">Sports</option>
          <option value="Lab">Lab</option>
          <option value="Musical">Musical</option>
          <option value="Stationery">Stationery</option>
          <option value="Electronics">Electronics</option>
          <option value="available">available</option>
        </select>
      </div>

      {/* 🔹 Equipment Cards */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredList.map((item) => (
          <EquipmentCard
            key={item.id}
            equipment={item}
            onapprove={() => approveItem(item)}
            onreject={() => rejectItem(item)}
          />
        ))}
      </div>
    </div>
  );
}
