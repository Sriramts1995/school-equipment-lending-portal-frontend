// src/pages/Requests.jsx
import { useState, useEffect } from "react";
import {
  getAllBorrowRequests,
  updateBorrowRequestStatus,
} from "../services/api";
import RequestsApproveReject from "../components/RequestsApproveReject";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch borrow requests on load
  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getAllBorrowRequests();
        // show only pending requests
        setRequests(
          data.filter((req) => req.status?.toUpperCase() === "PENDING")
        );
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  // Approve request
  const handleApprove = async (request) => {
    try {
      await updateBorrowRequestStatus(request.id, "APPROVED");

      // remove it from UI after approval
      setRequests((prev) => prev.filter((r) => r.id !== request.id));

      alert(` Approved request ID: ${request.id}`);
    } catch (err) {
      alert("Failed to approve request. Check console for details.");
      console.error(err);
    }
  };

  // Reject request
  const handleReject = async (request) => {
    try {
      await updateBorrowRequestStatus(request.id, "REJECTED");

      // remove it from UI after rejection
      setRequests((prev) => prev.filter((r) => r.id !== request.id));

      alert(`Rejected request ID: ${request.id}`);
    } catch (err) {
      alert("Failed to reject request. Check console for details.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading requests...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Borrow / Return Requests</h1>
      <p>Approve or reject pending requests below.</p>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {requests.length > 0 ? (
          requests.map((req) => (
            <RequestsApproveReject
              key={req.id}
              request={req}
              onapprove={() => handleApprove(req)}
              onreject={() => handleReject(req)}
            />
          ))
        ) : (
          <p>No pending requests.</p>
        )}
      </div>
    </div>
  );
}
