// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing

import "./NavBar.css"; // You can style this as per your requirements

const NavBar = () => {
  // State to manage user authentication
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  // Handle sign-in
  const handleSignIn = () => {
    if (username) {
      setUser(username); // Simulate user sign-in
      setUsername(""); // Clear the username input
    } else {
      alert("Please enter a username");
    }
  };

  // Handle sign-out
  const handleSignOut = () => {
    setUser(null); // Simulate user sign-out
  };

  return (
    <div className="navbar">
      <h2 className="logo">BudgetApp</h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/income">Income</Link>
        </li>
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
        <li>
          <Link to="/savings">Savings Strategy</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
    
      </ul>

      {/* User authentication section */}
      <div className="auth-section">
        {user ? (
          <>
            <span>Welcome, {user}!</span>
            <button onClick={handleSignOut}>Log Out</button>
          </>
        ) : (
          <div className="sign-in">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
