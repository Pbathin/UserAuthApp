import React from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const { logout } = useAuth(); // Get logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function to clear user data
    navigate("/accounts/login"); // Redirect to login page after logout
  };

  return (
    <div className="welcome-page">
      <h2 className="typing-effect">Welcome to our website....!</h2>{" "}
      {/* Apply typing effect */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;
