import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaUser, FaChartBar, FaCar, FaMoneyBill, FaBell, FaStar, FaBars 
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      
      {/* Profile Section at the Top */}
      <div className="profile-section">
        <FaUser className="icon profile-icon" />
        {isOpen && <span>Profile</span>}
      </div>

      {/* Sidebar Toggle Button Below Profile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar Menu */}
      <nav className="sidebar-menu">
        <Link to="/dashboard" className={`sidebar-item ${location.pathname === "/dashboard" ? "active" : ""}`}>
          <FaChartBar className="icon" />
          {isOpen && "Dashboard"}
        </Link>
        <Link to="/user" className={`sidebar-item ${location.pathname === "/user" ? "active" : ""}`}>
          <FaUser className="icon" />
          {isOpen && "Users"}
        </Link>
        <Link to="/ride-monitoring" className={`sidebar-item ${location.pathname === "/ride-monitoring" ? "active" : ""}`}>
          <FaCar className="icon" />
          {isOpen && "Ride Monitoring"}
        </Link>
        <Link to="/reports" className={`sidebar-item ${location.pathname === "/reports" ? "active" : ""}`}>
          <FaChartBar className="icon" />
          {isOpen && "Reports"}
        </Link>
        <Link to="/drivermanagement" className={`sidebar-item ${location.pathname === "/drivermanagement" ? "active" : ""}`}>
          <FaCar className="icon" />
          {isOpen && "Driver Management"}
        </Link>
        <Link to="/payment" className={`sidebar-item ${location.pathname === "/payment" ? "active" : ""}`}>
          <FaMoneyBill className="icon" />
          {isOpen && "Payment"}
        </Link>
        <Link to="/notification" className={`sidebar-item ${location.pathname === "/notification" ? "active" : ""}`}>
          <FaBell className="icon" />
          {isOpen && "Notification"}
        </Link>
        <Link to="/reviews" className={`sidebar-item ${location.pathname === "/reviews" ? "active" : ""}`}>
          <FaStar className="icon" />
          {isOpen && "Reviews"}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
