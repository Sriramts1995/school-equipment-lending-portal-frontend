// src/pages/EquipmentManagement.jsx
import { useNavigate } from "react-router-dom";
import EquipmentCard from "../components/EquipmentCardAdmin";
import { equipmentList } from "../services/api";
import { useState } from "react";
export default function EquipmentManagement() {
  const [category, setCategory] = useState("none");
  const navigate = useNavigate();

  const handleAddItem = () => {
    navigate("/add-item");
  };

    const updateItem = () => {
    alert("Item Update is in progress");
  };

  const deleteItem = () => {
    alert("Item Deletion is in progress");
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
        <h1>Manage Equipments</h1>

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

        {/* ✅ Single Add Item Button */}
        <button
          onClick={handleAddItem}
          style={{
            padding: "10px 20px",
            backgroundColor: "#081711ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Item
        </button>
      </div>

      {/* 🔹 Equipment Cards */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredList.map((item) => (
          <EquipmentCard key={item.id} equipment={item} 
          onupdate={() => updateItem(item)}
          ondelete={() => deleteItem(item)}
          />
        ))}
      </div>
    </div>
  );
}
