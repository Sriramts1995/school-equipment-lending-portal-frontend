// src/pages/ItemBookings.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { bookItem, updateBorrowRequestStatus } from "../services/api";

export default function ItemBookings() {
  const navigate = useNavigate();
  const location = useLocation();

  const existingItem = location.state?.equipment || null;
  const mode = location.state?.mode || "book"; // "book" | "return"
  const passedStartDate = location.state?.startDate || "";
  const passedEndDate = location.state?.endDate || "";

  // Get requestId if it was passed from dashboard (for return)
  const requestId = location.state?.requestId || null;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [quantity, setQuantity] = useState("");
  const [available, setAvailable] = useState(true);
  const [startdate, setStartDate] = useState("");
  const [endate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingItem) {
      setId(existingItem.id);
      setName(existingItem.name);
      setCategory(existingItem.category);
      setCondition(existingItem.conditiontype);
      setQuantity(existingItem.quantity);
      setAvailable(existingItem.available);
      setStartDate(passedStartDate);
      setEndDate(passedEndDate);
    }
  }, [existingItem, passedStartDate, passedEndDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (mode === "book") {
        const itemData = {
          startDate: passedStartDate || startdate,
          endDate: passedEndDate || endate,
          requestedby: localStorage.getItem("uname"),
          status: "PENDING",
          equipment: { id },
          user: { id: localStorage.getItem("loginid") },
        };

        await bookItem(itemData);
        alert("Item booked successfully!");
      } else if (mode === "return") {
        if (!requestId) {
          alert("Missing request ID for return operation!");
          return;
        }

        await updateBorrowRequestStatus(requestId, "RETURNED");
        alert("Item returned successfully!");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Action failed:", error);
      alert("Failed to perform action.");
    } finally {
      setLoading(false);
    }
  };

  const isReadOnly = mode === "book" || "update";
  const quantvalue = 1;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{mode === "book" ? "Book Equipment" : "Return Equipment"}</h2>

      {mode === "return" && (
        <p style={{ color: "red" }}>
          Are you sure you want to return this item?
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          gap: "10px",
        }}
      >
        <label>
          Name:
          <input type="text" value={name} readOnly required />
        </label>

        <label>
          Category:
          <input type="text" value={category} readOnly required />
        </label>

        <label>
          Condition:
          <input type="text" value={condition} readOnly required />
        </label>

        <label>
          Quantity:
          <input type="number" value={quantvalue} readOnly required />
        </label>

        <label>
          Start Date:
          <input type="date" value={startdate} readOnly required />
        </label>

        <label>
          End Date:
          <input type="date" value={endate} readOnly required />
        </label>

        <label>
          Available:
          <select value={available} disabled>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <button
          type="submit"
          style={{
            backgroundColor: mode === "return" ? "red" : "#081711ff",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading
            ? mode === "return"
              ? "Returning..."
              : "Booking..."
            : mode === "return"
            ? "Return Item"
            : "Book Item"}
        </button>
      </form>
    </div>
  );
}
