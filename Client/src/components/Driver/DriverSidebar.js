import React from "react";
import { useNavigate } from "react-router-dom";
import "./driversidebar.css"; // Using the same styling as Rider Sidebar

const DriverSidebar = ({ setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <h2>Driver Panel</h2>
            <ul>
                <li>
                    <a href="/driver-dashboard" className="active"> Dashboard</a>
                </li>
                <li>
                    <a href="/my-rides"> My Rides</a>
                </li>
                <li>
                    <a href="/earnings"> Earnings</a>
                </li>
                <li>
                    <a href="/profile"> Profile</a>
                </li>
                <li>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
    );
};

export default DriverSidebar;
