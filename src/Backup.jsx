//=================================================================EquipmentCard.jsx =============================================================================================
// export default function EquipmentCard({ equipment }) {
//   return (
//     <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', borderRadius: '5px' }}>
//       <h3>{equipment.name}</h3>
//       <p>Category: {equipment.category}</p>
//       <p>Condition: {equipment.condition}</p>
//       <p>Quantity: {equipment.quantity}</p>
//       <p>Available: {equipment.available ? 'Yes' : 'No'}</p>
//     </div>
//   );
// }

// src/components/EquipmentCard.jsx
import { equipmentList, createBookingRequest } from '../services/api';
export default function EquipmentCard({ equipment, onBook  }) {

//       const handleBook = async () => {
//     try {
//       const result = await createBookingRequest(equipment.name, currentUser);
//       alert(`✅ Request created successfully!\n\nEquipment: ${result.equipment}\nStatus: ${result.status}`);
//     } catch (err) {
//       alert(`❌ Failed to create request: ${err}`);
//     }
//   };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '15px',
      margin: '10px',
      width: '250px',
      boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
    }}>
      <h3>{equipment.name}</h3>
      <p><strong>Category:</strong> {equipment.category}</p>
      <p><strong>Condition:</strong> {equipment.condition}</p>
      <p><strong>Quantity:</strong> {equipment.quantity}</p>
      <p><strong>Available:</strong> {equipment.available ? 'Yes' : 'No'}</p>
      {equipment.available && (
        <button
        onClick={onBook}
          style={{
            padding: '8px 16px',
            backgroundColor: '#081711ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Book Item
        </button>
        )}
    </div>
  );
}

//=====================================================================================================================================================================================
//=============================================================LoginForm.jsx=============================================================================================================
import { useState } from "react";
import { users } from "../services/api";
import schoolEquipment from "C:/Users/Sriram/school-equipment-portal/src/assets/logo.png";
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // <-- hook to navigate programmatically

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.id === "sign-in") {
      alert("Sign in is still under creation");
    } else {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        onLogin(user.role, user.username);
        setError("");
        navigate('/dashboard'); // ✅ redirect user immediately after login
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ flex: "1", textAlign: "center" }}>
        <img
          src={schoolEquipment}
          alt="School Equipment"
          style={{
            width: "80%",
            maxWidth: "600px",
            marginTop: "0px",
            borderRadius: "8px",
          }}
        />
      </div>
      <div style={{ flex: "1", maxWidth: "300px" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "50px",
              height: "10vh",
              padding: "0px",
            }}
          >
            <button
              id="login"
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#081711ff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Login
            </button>

            <button
              id="sign-in"
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#081711ff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Sign in
            </button>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
//===================================================================================================================================================================================
//====================================================================NavBar.jsx=====================================================================================================
import { Link } from "react-router-dom";

//<Link to="/equipment" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Equipment</Link>
//<Link to="/" style={{ marginRight: '15px', color: 'white', textDecoration: 'none'}}>Home</Link>
export default function Navbar({ userRole }) {
  return (
    <nav
      style={{
        padding: "15px",
        backgroundColor: "#1976d2",
        color: "white",
        width: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: 1000,
      }}
    >
      <Link
        to="/dashboard"
        style={{ marginRight: "15px", color: "white", textDecoration: "none" }}
      >
        Dashboard
      </Link>

      {userRole === "admin" && (
        <Link
          to="/equipment"
          style={{
            marginRight: "15px",
            color: "white",
            textDecoration: "none",
          }}
        >
          Equipment
        </Link>
      )}

      {(userRole === "admin" || userRole === "staff") && (
        <Link to="/requests" style={{ color: "white", textDecoration: "none" }}>
          Requests
        </Link>
      )}
    </nav>
  );
}
//=====================================================================================================================================================================================
//============================================================Dashboard.jsx============================================================================================================
// // src/pages/Dashboard.jsx
// export default function Dashboard() {
//   return (
//     <div style={{ padding: '20px', width: '200%' }}>
//       <h1>Dashboard</h1>
//       <p>List of all equipment will appear here.</p>
//     </div>
//   );
// }


// src/pages/Dashboard.jsx
import EquipmentCard from '../components/EquipmentCard';
//import { equipmentList } from '../services/api';
import { equipmentList, createBookingRequest } from '../services/api';

export default function Dashboard({ currentUser }) {
//   const equipmentList = [
//     { name: 'Microscope', category: 'Lab', condition: 'Good', quantity: 5, available: true },
//     { name: 'Football', category: 'Sports', condition: 'Fair', quantity: 10, available: true },
//     { name: 'Camera', category: 'Media', condition: 'Excellent', quantity: 2, available: false },
//     { name: 'Projector', category: 'Classroom', condition: 'Good', quantity: 1, available: true }
//   ];

//   const handleBookItem = (equipment) => {
//     // Here you’ll later call your service API to create a request
//     alert(`${currentUser} requested to book ${equipment.name}`);
//   };

        const handleBookItem = async (equipment) => {
    try {
      const result = await createBookingRequest(equipment.name, currentUser);
      alert(`✅ Request created successfully!\n\nEquipment: ${result.equipment}\nStatus: ${result.status}`);
    } catch (err) {
      alert(`❌ Failed to create request: ${err}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>All equipment is listed below:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {equipmentList.map((item, index) => (
          <EquipmentCard key={index} equipment={item} onBook={() => handleBookItem(item)}/>
        ))}
      </div>
    </div>
  );
}
//=================================================================================================================================================================================
//===============================================================EquipmementManagement.jsx=========================================================================================
// // src/pages/Home.jsx
// export default function EquipmentManagement() {
//   return (
//     <div>
//       <h1>EquipmentManagement</h1>
//       <p>List of all equipment will appear here.</p>
//     </div>
//   );
// }

import EquipmentCard from '../components/EquipmentCard';
import { equipmentList } from '../services/api';

export default function EquipmentManagement() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Equipment Management (Admin Only)</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {equipmentList.map(item => (
          <EquipmentCard key={item.id} equipment={item} />
        ))}
      </div>
    </div>
  );
}
//===================================================================================================================================================================================
//=============================================================Home.jsx==============================================================================================================
import schoolEquipment from 'C:/Users/Sriram/school-equipment-portal/src/assets/logo.png';
export default function Home() {
  return (
    <div style={{ padding: '0px', marginTop:'0px' }}>
      <h1>Welcome to School Equipment Lending Portal</h1>
      <img 
        src={schoolEquipment} 
        alt="School Equipment" 
        style={{ width: '80%', maxWidth: '600px', marginTop: '0px', borderRadius: '8px'}}
      />
      <p><b>Request, approve, and manage school equipment efficiently.</b></p>
    </div>
  );
}
//=========================================================================================================================================================================
//==========================================================Login.jsx======================================================================================================
import LoginForm from '../components/LoginForm';

export default function Login({ onLogin }) {
  return <LoginForm onLogin={onLogin} />;
}

//==========================================================================================================================================================================
//==========================================================Requests.jsx====================================================================================================
// // src/pages/Home.jsx
// export default function Requests() {
//   return (
//     <div>
//       <h1>Requests</h1>
//     </div>
//   );
// }

export default function Requests() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Borrow/Return Requests</h1>
      <p>Students can request equipment, staff/admin can approve or reject.</p>
    </div>
  );
}
//===========================================================================================================================================================
//=============================================api.js=========================================================================================================
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

// ✅ Temporary in-memory list for requests
export const requests = [];

// ✅ Mock API call to create a booking request
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
//=================================================================================================================================================================================
//======================================app.jsx===================================================================================================================================
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import Home from './pages/Home';
// // import Dashboard from './pages/Dashboard';
// // import EquipmentManagement from './pages/EquipmentManagement';
// // import Requests from './pages/Requests';

// // /**STEP -2: This is top level controller - App Component, Controls global app state(currently logged-in user role), If user is not logged in, 
// //  * it renders the Login page (<Login onLogin={handleLogin} />). */
// // function App() {
// //   return (
// //     <Router>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="/equipment" element={<EquipmentManagement />} />
// //         <Route path="/requests" element={<Requests />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// // src/App.jsx
// //==================================================================================
// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import EquipmentManagement from './pages/EquipmentManagement';
// import Requests from './pages/Requests';

// export default function App() {
//   // Global user role state (student, staff, admin, or null)
//   const [userRole, setUserRole] = useState(null);

//   // Function to handle login and set role
//   const handleLogin = (role) => {
//     setUserRole(role);
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     setUserRole(null);
//   };

//   // If no one is logged in → show login page
//   if (!userRole) {
//     return <Login onLogin={handleLogin} />;
//   }

//   // Logged-in view → show navbar + pages
//   //<Route path="/" element={<Home />} />
//   return (
//     <Router>
//       <Navbar userRole={userRole} />
//       <div style={{ padding: '20px' }}>
//         <Routes>
          
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/requests" element={<Requests />} />
          
//           {/* Only admins can access this page */}
//           {userRole === 'admin' && (
//             <Route path="/equipment" element={<EquipmentManagement />} />
//           )}
//         </Routes>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           style={{
//             marginTop: '20px',
//             padding: '8px 16px',
//             backgroundColor: '#d9534f',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </Router>
//   );
// }

import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';


import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EquipmentManagement from './pages/EquipmentManagement';
import Requests from './pages/Requests';

function AppContent() {
  const [user, setUser] = useState(null); // { username, role }
  const navigate = useNavigate();

  const handleLogin = (role, username) => {
    setUser({ username, role });
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/', { replace: true }); // ✅ redirects to root
    //window.location.href = "/"; 
  };

  return (
    <>
      {user && <Navbar userRole={user.role} />}
      <div style={{ padding: user ? '20px' : '0' }}>
        <Routes>
          {!user  ? (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard currentUser={user.username} />} />
              <Route path="/requests" element={<Requests />} />
              {user.role === 'admin' && (
                <Route path="/equipment" element={<EquipmentManagement />} />
              )}
              <Route path="/home" element={<Home />} />
            </>
          )}
        </Routes>

        {user && (
          <button
            onClick={handleLogout}
            style={{
              marginTop: '20px',
              padding: '8px 16px',
              backgroundColor: '#d9534f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}


export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

//=========================================================================================================================================================================================