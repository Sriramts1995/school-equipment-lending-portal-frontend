// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import EquipmentCard from "../components/EquipmentCard";
import { getAllEquipment, getBorrowRequestsByUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ currentUser, userid }) {
  const [category, setCategory] = useState("none");
  const [equipmentList, setEquipmentList] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const navigate = useNavigate();

  const userId = Number(userid) || 1;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [equipmentData, userBorrowData] = await Promise.all([
          getAllEquipment(),
          getBorrowRequestsByUser(userId),
        ]);
        if (isMounted) {
          setEquipmentList(equipmentData);
          setUserRequests(userBorrowData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  // Navigate to booking/return page
  const handleAction = (
    equipment,
    startDate,
    endDate,
    mode,
    requestId = null
  ) => {
    navigate("/itembookings", {
      state: { equipment, startDate, endDate, mode, requestId },
    });
  };

  // Find request by equipmentId
  const getUserRequest = (equipmentId) => {
    return userRequests.find((r) => r.equipment?.id === equipmentId);
  };

  // Handle button click
  const handleBookItem = (equipment, startDate, endDate) => {
    const request = getUserRequest(equipment.id);
    const status = request ? request.status?.toUpperCase() : null;

    if (status === "APPROVED") {
      // returning the item — pass requestId to next page
      handleAction(equipment, startDate, endDate, "return", request.id);
    } else {
      // booking new item — no requestId yet
      handleAction(equipment, startDate, endDate, "book");
    }
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
          <option value="available">Available</option>
        </select>
      </div>

      <p>All equipment is listed below:</p>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredList.map((item) => {
          const request = getUserRequest(item.id);
          const status = request ? request.status?.toUpperCase() : null;

          return (
            <EquipmentCard
              key={item.id}
              equipment={item}
              onBook={(equip, s, e) => handleBookItem(equip, s, e)}
              requestStatus={status}
            />
          );
        })}
      </div>
    </div>
  );
}
