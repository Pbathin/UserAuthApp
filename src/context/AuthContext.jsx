import React, { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information

  const login = (userData) => {
    setUser(userData); // Save user data when logged in
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
