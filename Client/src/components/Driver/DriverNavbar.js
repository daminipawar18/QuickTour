import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsBell, BsCarFrontFill, BsClipboardCheck } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const DriverNavbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
            }
        }
        fetchNotifications();
    }, []);

    const fetchNotifications = () => {
        // Simulating fetching notifications from an API
        const dummyNotifications = [
            { id: 1, message: "New ride request received.", read: false },
            { id: 2, message: "Your ride has been confirmed.", read: true },
        ];
        setNotifications(dummyNotifications);
        setUnreadCount(dummyNotifications.filter(n => !n.read).length);
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <span className="navbar-brand text-light fw-bold" style={{ fontSize: "1.5rem" }}>
                    Driver Dashboard
                </span>
                <div className="d-flex align-items-center">
                    <div className="dropdown me-3">
                        <button
                            className="btn position-relative text-light"
                            id="notificationDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <BsBell size={28} className="notification-icon" />
                            {unreadCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
                            {notifications.length > 0 ? (
                                notifications.map(notification => (
                                    <li key={notification.id} className={notification.read ? "text-muted" : "text-dark fw-bold"}>
                                        <span className="dropdown-item">{notification.message}</span>
                                    </li>
                                ))
                            ) : (
                                <li><span className="dropdown-item text-muted">No notifications</span></li>
                            )}
                            <li><button className="dropdown-item text-primary" onClick={markAllAsRead}>Mark all as read</button></li>
                        </ul>
                    </div>
                    <button className="btn btn-outline-light me-3 d-flex align-items-center" onClick={() => navigate("/publish-ride")}>
                        <BsCarFrontFill size={18} className="me-2" /> Publish Ride
                    </button>
                    <button className="btn btn-outline-light me-3 d-flex align-items-center" onClick={() => navigate("/driver-rides")}>
                        <BsClipboardCheck size={18} className="me-2" /> My Rides
                    </button>
                    {user ? (
                        <div className="dropdown">
                            <button className="btn d-flex align-items-center text-light" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaUserCircle size={34} className="me-2" />
                                <span className="fw-bold">{user.first_name || "Driver"}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" style={{ backgroundColor: "#343a40" }}>
                                <li><span className="dropdown-item-text fw-bold text-light">User: {user.first_name || "N/A"}</span></li>
                                <li><span className="dropdown-item-text text-light">Mobile: {user.mobile_no || "N/A"}</span></li>
                                <li><span className="dropdown-item-text text-light">Role: {user.role || "N/A"}</span></li>
                                <li><button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <button className="btn btn-outline-light" onClick={() => navigate("/login")}>Login</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default DriverNavbar;
