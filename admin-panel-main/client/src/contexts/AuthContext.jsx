// src/contexts/AuthContext.jsx
import React, { createContext, useState } from "react";
import Dashboard from "../components/Dashboard"; // Use correct path based on your structure
import Login from "../components/Login"; // Same here

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
