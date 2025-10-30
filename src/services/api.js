// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api'; // backend base URL

// export const fetchEquipment = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/equipment`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// src/services/api.js

// Dummy equipment data
// export const equipmentList = [
//   {
//     id: 1,
//     name: "Microscope",
//     category: "Lab",
//     condition: "Good",
//     quantity: 5,
//     available: true,
//   },
//   {
//     id: 2,
//     name: "Football",
//     category: "Sports",
//     condition: "Fair",
//     quantity: 10,
//     available: true,
//   },
//   {
//     id: 3,
//     name: "Camera",
//     category: "Media",
//     condition: "Excellent",
//     quantity: 2,
//     available: false,
//   },
//   {
//     id: 4,
//     name: "Projector",
//     category: "Classroom",
//     condition: "Good",
//     quantity: 1,
//     available: true,
//   },
// ];

// Dummy user roles
// export const users = [
//   { username: "user", password: "pass", role: "user" },
//   { username: "staff", password: "pass", role: "staff" },
//   { username: "admin", password: "pass", role: "admin" },
// ];

// Temporary in-memory list for requests
//export const requests = [];

// Mock API call to create a booking request
// export function createBookingRequest(equipmentName, username) {
//   return new Promise((resolve, reject) => {
//     const equipment = equipmentList.find((e) => e.name === equipmentName);
//     if (!equipment) {
//       reject("Equipment not found");
//     } else if (!equipment.available) {
//       reject("Item not available");
//     } else {
//       const newRequest = {
//         id: requests.length + 1,
//         equipment: equipmentName,
//         requestedBy: username,
//         status: "Pending",
//         date: new Date().toLocaleString(),
//       };
//       requests.push(newRequest);
//       resolve(newRequest);
//     }
//   });
// }

// src/services/api.js

const BASE_URL = "http://localhost:8080";

// --- Utility: central fetch wrapper ---
async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    console.warn("Unauthorized — possible token expiry");
    // could auto-logout or refresh token here if implemented
  }
  return response;
}

// --- Auth APIs (NO Authorization header needed) ---
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error(`Login failed: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function signupUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Signup failed: ${errorText}`);
    }
    return "Success";
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

// --- Equipment APIs ---
export async function getAllEquipment() {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/v1/equipment`, {
      method: "GET",
    });
    if (!response.ok) throw new Error(`Failed to fetch equipment: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return [];
  }
}

export async function addItem(item) {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/v1/equipment`, {
      method: "POST",
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to add item");
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

export async function updateItemById(item) {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/v1/equipment`, {
      method: "PUT",
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to update item");
    return await response.json();
  } catch (error) {
    console.error("API error (updateItemById):", error);
    throw error;
  }
}

export async function deleteItemById(id) {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/v1/equipment/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete item");
    return await response;
  } catch (error) {
    console.error("API error (deleteItemById):", error);
    throw error;
  }
}

// --- Borrow Requests ---
export async function bookItem(data) {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/v1/borrowrequest`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create borrow request: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API error (bookItem):", error);
    throw error;
  }
}

export async function getAllBorrowRequests() {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/v1/borrowrequest`, {
      method: "GET",
    });
    if (!response.ok) throw new Error("Failed to fetch borrow requests");
    return await response.json();
  } catch (error) {
    console.error("API error (getAllBorrowRequests):", error);
    return [];
  }
}

export async function getBorrowRequestsByUser(userId) {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/v1/borrowrequest/user/${userId}`, {
      method: "GET",
    });
    if (!response.ok) throw new Error("Failed to fetch user borrow requests");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user borrow requests:", error);
    return [];
  }
}

export async function updateBorrowRequestStatus(requestId, newStatus) {
  const response = await fetchWithAuth(
    `${BASE_URL}/api/v1/borrowrequest/updatestatus?requestId=${requestId}&status=${newStatus}`,
    { method: "PATCH" }
  );
  if (!response.ok) throw new Error("Failed to update status");
  return await response;
}

// --- Logout ---
export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      localStorage.removeItem("authToken");
      const message = await response.text();
      console.log("Logout success:", message);
      return message;
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Logout API error:", error);
    throw error;
  }
};
