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
export const requests = [];

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

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    // Assuming your backend returns a JSON with user info or token
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

// SIGNUP API CALL
export async function signupUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Signup failed: ${errorText}`);
    }

    //const data = await response.json();
    return "Success";
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function getAllEquipment() {
  try {
    //const response = await fetch(`${BASE_URL}/api/v1/equipment`);
    const response = await fetch(`${BASE_URL}/api/v1/equipment`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch equipment: ${response.status}`);
    }

    const data = await response.json();
    return data; // should be an array
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return []; // return empty array on error to prevent crashes
  }
}

export async function addItem(item) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/equipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Failed to add item");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

export async function updateItemById(item) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/equipment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Failed to update item");
    }

    return await response.json();
  } catch (error) {
    console.error("API error (updateItemById):", error);
    throw error;
  }
}

export async function deleteItemById(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/equipment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
    });
    if (!response.ok) throw new Error("Failed to delete item");
    return await response;
  } catch (error) {
    console.error("API error (deleteItemById):", error);
    throw error;
  }
}

export async function bookItem(data) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/borrowrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify(data), // include borrow request data here
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create borrow request: ${errorText}`);
    }

    // return parsed JSON response (e.g., created borrow request)
    return await response.json();
  } catch (error) {
    console.error("API error (bookitem):", error);
    throw error;
  }
}

export async function returnItem(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/equipment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
    });
    if (!response.ok) throw new Error("Failed to delete item");
    return await response;
  } catch (error) {
    console.error("API error (deleteItemById):", error);
    throw error;
  }
}

// Fetch all borrow requests
export async function getAllBorrowRequests() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/borrowrequest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to fetch borrow requests: ${err}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API error (getAllBorrowRequests):", error);
    return [];
  }
}

// Get borrow requests for a specific user
export async function getBorrowRequestsByUser(userId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/borrowrequest/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("authToken"),
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch user borrow requests");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user borrow requests:", error);
    return [];
  }
}

export async function updateBorrowRequestStatus(requestId, newStatus) {
  const response = await fetch(
    `${BASE_URL}/api/v1/borrowrequest/updatestatus?requestId=${requestId}&status=${newStatus}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
    }
  );
  if (!response.ok) throw new Error("Failed to update status");
  return await response;
}

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST", // or "GET" if your backend expects it
      headers: {
        "Content-Type": "application/json",
         "Authorization": "Bearer " + localStorage.getItem("authToken"),
      },
      credentials: "include", // include cookies/session if applicable
    });

    if (response.ok) {
      const message = await response.text(); // "User logout successfully"
      console.log("Logout success:", message);
      return message;
    } else {
      console.error("Logout failed:", response.status);
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Logout API error:", error);
    throw error;
  }
};