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
export const equipmentList = [
  { id: 1, name: 'Microscope', category: 'Lab', condition: 'Good', quantity: 5, available: true },
  { id: 2, name: 'Football', category: 'Sports', condition: 'Fair', quantity: 10, available: true },
  { id: 3, name: 'Camera', category: 'Media', condition: 'Excellent', quantity: 2, available: false },
  { id: 4, name: 'Projector', category: 'Classroom', condition: 'Good', quantity: 1, available: true }
];

// Dummy user roles
export const users = [
  { username: 'user', password: 'pass', role: 'user' },
  { username: 'staff', password: 'pass', role: 'staff' },
  { username: 'admin', password: 'pass', role: 'admin' }
];

// Temporary in-memory list for requests
export const requests = [];

// Mock API call to create a booking request
export function createBookingRequest(equipmentName, username) {
  return new Promise((resolve, reject) => {
    const equipment = equipmentList.find(e => e.name === equipmentName);
    if (!equipment) {
      reject('Equipment not found');
    } else if (!equipment.available) {
      reject('Item not available');
    } else {
      const newRequest = {
        id: requests.length + 1,
        equipment: equipmentName,
        requestedBy: username,
        status: 'Pending',
        date: new Date().toLocaleString(),
      };
      requests.push(newRequest);
      resolve(newRequest);
    }
  });
}