import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsBell, BsFilter } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const RiderNavbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Load user data
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("❌ Error parsing user data:", error);
            }
        }
    }, []);

    // Simulate receiving a notification (mock API call or real-time event)
    useEffect(() => {
        const eventSource = new EventSource("/api/notifications"); // Replace with real API if available
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "ride_accepted" || data.type === "ride_confirmed" || data.type === "ride_completed") {
                setToastMessage(data.message);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 5000); // Auto-hide after 5s
            }
        };
        return () => eventSource.close();
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <span className="navbar-brand text-light fw-bold" style={{ fontSize: "1.5rem" }}>
                    Rider Dashboard
                </span>

                <div className="d-flex align-items-center">
                    {/* Filter Icon */}
                    <BsFilter size={22} className="text-light me-3 filter-icon" />

                    {/* User Profile Dropdown */}
                    {user ? (
                        <div className="dropdown">
                            <button
                                className="btn d-flex align-items-center text-light"
                                id="userDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <FaUserCircle size={30} className="me-2" />
                                <span className="fw-bold">{user.first_name || "User"}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end bg-dark text-light" aria-labelledby="userDropdown">
                                <li className="dropdown-item-text">User: {user.first_name || "N/A"}</li>
                                <li className="dropdown-item-text">Mobile: {user.mobile_no || "N/A"}</li>
                                <li className="dropdown-item-text">Role: {user.role || "N/A"}</li>
                                <li>
                                    <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <button className="btn btn-outline-light" onClick={() => navigate("/login")}>
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* Toast Notification Popup */}
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} bg="success" delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </nav>
    );
};

export default RiderNavbar;
