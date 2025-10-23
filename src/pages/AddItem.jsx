// src/pages/AddItem.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [quantity, setQuantity] = useState("");
  const [available, setAvailable] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`New Item Added:
    Name: ${name}
    Category: ${category}
    Condition: ${condition}
    Quantity: ${quantity}
    Available: ${available ? "Yes" : "No"}`);

    navigate("/admin-dashboard"); // go back after adding
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Equipment</h2>
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
          <br></br>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Category:
          <br></br>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <label>
          Condition:
          <br></br>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </label>

        <label>
          Quantity:
          <br></br>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>

        <label>
          Available:
          <br></br>
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value === "true")}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <br></br>
        <br></br>
        <button
          type="submit"
          style={{
            backgroundColor: "#081711ff",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
