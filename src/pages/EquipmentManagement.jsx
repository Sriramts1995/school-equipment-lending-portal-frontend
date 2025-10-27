// src/pages/EquipmentManagement.jsx
import { useNavigate } from "react-router-dom";
import EquipmentCard from "../components/EquipmentCardAdmin";
import { getAllEquipment } from "../services/api";
import { useState, useEffect } from "react";

export default function EquipmentManagement() {
  const [category, setCategory] = useState("none");
  const [equipmentList, setEquipmentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEquipment();
      setEquipmentList(data);
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    navigate("/itemmanagement", { state: { mode: "add" } }); // Add mode, empty form
  };

  const handleUpdateItem = (item) => {
    navigate("/itemmanagement", { state: { item, mode: "update" } }); // Update mode, prefilled
  };

  const handleDeleteItem = (item) => {
    navigate("/itemmanagement", { state: { item, mode: "delete" } }); // Delete mode, prefilled
  };

  const filteredList = equipmentList.filter((item) => {
    if (category === "none" || category === false) return true;
    if (category === "available") return item.available === true;
    return item.category.toLowerCase() === category.toLowerCase();
  });

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          gap: "12px",
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

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredList.map((item) => (
          <EquipmentCard
            key={item.id}
            equipment={item}
            onupdate={() => handleUpdateItem(item)}
            ondelete={() => handleDeleteItem(item)}
          />
        ))}
      </div>
    </div>
  );
}
