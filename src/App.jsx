import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import "./styles/welcome.css";
import "./styles/form.css";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/accounts/signup" element={<Signup />} />
          <Route path="/accounts/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
