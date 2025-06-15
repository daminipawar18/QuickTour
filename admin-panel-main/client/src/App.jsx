import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./Components/Login";
import User from "./Components/User";
import RideMonitoring from "./Components/RideMonitoring";
import Reports from "./Components/Reports";
import Dashboard from "./Components/Dashboard";
import Sidebar from "./Components/Sidebar";
import DriverManagement from "./Components/DriverManagement";
import NotificationCenter from "./Components/NotificationCenter";
import ReviewsManagement from "./Components/ReviewsManagement";
import PaymentManagement from "./Components/PaymentManagement";

import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import "./App.css";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard /> : <Login />}
            />
            <Route
              path="/user"
              element={isAuthenticated ? <User /> : <Navigate to="/" />}
            />
            <Route
              path="/ride-monitoring"
              element={isAuthenticated ? <RideMonitoring /> : <Navigate to="/" />}
            />
            <Route
              path="/reports"
              element={isAuthenticated ? <Reports /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/drivermanagement"
              element={isAuthenticated ? <DriverManagement /> : <Navigate to="/" />}
            />
            <Route
              path="/payment"
              element={isAuthenticated ? <PaymentManagement /> : <Navigate to="/" />}
            />
            <Route
              path="/notification"
              element={isAuthenticated ? <NotificationCenter /> : <Navigate to="/" />}
            />
            <Route
              path="/reviews"
              element={isAuthenticated ? <ReviewsManagement /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Root = () => (
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

export default Root;
