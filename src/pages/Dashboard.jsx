//src/pages/Dashboard.jsx
import { useState } from "react";
import EquipmentCard from "../components/EquipmentCard";
import { equipmentList, createBookingRequest } from "../services/api";

export default function Dashboard({ currentUser }) {
  const [category, setCategory] = useState("none");
  //const handlecategory = (e = {});
  const handleBookItem = async (equipment) => {
    try {
      const result = await createBookingRequest(equipment.name, currentUser);
      alert(
        `Request created successfully!\n\nEquipment: ${result.equipment}\nStatus: ${result.status}`
      );
    } catch (err) {
      alert(`Failed to create request: ${err}`);
    }
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
        <h1>Dashboard</h1>
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
      <p>All equipment is listed below:</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredList.map((item, index) => (
          <EquipmentCard
            key={index}
            equipment={item}
            onBook={() => handleBookItem(item)}
          />
        ))}
      </div>
    </div>
  );
}
