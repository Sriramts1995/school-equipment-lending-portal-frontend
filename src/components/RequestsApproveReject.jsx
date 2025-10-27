// src/components/RequestsApproveReject.jsx
export default function RequestsApproveReject({
  request,
  onapprove,
  onreject,
}) {
  if (!request) {
    return <div>Loading request...</div>; // Prevent crash
  }

  const { equipment, user, requestedby, status, startDate, endDate } =
    request || {};

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        width: "260px",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{equipment?.name || "Unknown Equipment"}</h3>
      <p>
        <strong>Category:</strong> {equipment?.category || "-"}
      </p>
      <p>
        <strong>Condition:</strong> {equipment?.conditiontype || "-"}
      </p>
      <p>
        <strong>Quantity:</strong> {equipment?.quantity || "-"}
      </p>
      <p>
        <strong>Requested By:</strong> {requestedby || user?.name || "Unknown"}
      </p>
      <p>
        <strong>Status:</strong> {status || "PENDING"}
      </p>
      <p>
        <strong>Start:</strong> {startDate || "-"}
      </p>
      <p>
        <strong>End:</strong> {endDate || "-"}
      </p>

      <button
        onClick={onapprove}
        style={{
          width: "100%",
          padding: "8px 16px",
          backgroundColor: "#081711ff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "6px",
        }}
      >
        Approve
      </button>

      <button
        onClick={onreject}
        style={{
          width: "100%",
          padding: "8px 16px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Reject
      </button>
    </div>
  );
}
