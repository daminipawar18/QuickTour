import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css"; 

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <h2>Quick Tour</h2>
            <ul>
                <li>
                    <Link to="/rider-dashboard" className={location.pathname === "/rider-dashboard" ? "active" : ""}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/my-rides" className={location.pathname === "/my-rides" ? "active" : ""}>
                        My Rides
                    </Link>
                </li>
                <li>
                    <Link to="/ride-history" className={location.pathname === "/ride-history" ? "active" : ""}>
                        Ride History
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
                        Profile
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
