// src/pages/ItemManagement.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addItem, updateItemById, deleteItemById } from "../services/api";

export default function ItemManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const existingItem = location.state?.item || null;
  const mode = location.state?.mode || "add"; // "add" | "update" | "delete"

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [quantity, setQuantity] = useState("");
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  // Prefill form if updating or deleting
  useEffect(() => {
    if (existingItem) {
      setId(existingItem.id);
      setName(existingItem.name);
      setCategory(existingItem.category);
      setCondition(existingItem.conditiontype);
      setQuantity(existingItem.quantity);
      setAvailable(existingItem.available);
    }
  }, [existingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      id,
      name,
      category,
      conditiontype: condition,
      quantity: Number(quantity),
      available,
    };

    try {
      setLoading(true);

      if (mode === "add") {
        await addItem(itemData);
        alert("New item added successfully!");
      } else if (mode === "update") {
        await updateItemById(itemData);
        alert("Item updated successfully!");
      } else if (mode === "delete") {
        await deleteItemById(id);
        alert("Item deleted successfully!");
      }

      navigate("/equipment");
    } catch (error) {
      alert("Failed to perform action. Check console for details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isReadOnly = mode === "delete";

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {mode === "add" && "Add New Equipment"}
        {mode === "update" && "Update Equipment"}
        {mode === "delete" && "Delete Equipment"}
      </h2>

      {mode === "delete" && (
        <p style={{ color: "red" }}>
          Are you sure you want to delete this item?
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
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            readOnly={isReadOnly}
          />
        </label>

        <label>
          Category:
          <br />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            readOnly={isReadOnly}
          />
        </label>

        <label>
          Condition:
          <br />
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            readOnly={isReadOnly}
          />
        </label>

        <label>
          Available Quantity:
          <br />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            readOnly={isReadOnly}
          />
        </label>

        <label>
          Available:
          <br />
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value === "true")}
            disabled={isReadOnly}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <button
          type="submit"
          style={{
            backgroundColor: mode === "delete" ? "red" : "#081711ff",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading
            ? mode === "delete"
              ? "Deleting..."
              : mode === "update"
              ? "Updating..."
              : "Adding..."
            : mode === "delete"
            ? "Delete Item"
            : mode === "update"
            ? "Update Item"
            : "Add Item"}
        </button>
      </form>
    </div>
  );
}
