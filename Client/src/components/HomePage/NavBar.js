import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const UserNavbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // ✅ Fetch user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("✅ Navbar Fetched User:", parsedUser); // Debugging
                setUser(parsedUser); 
            } catch (error) {
                console.error("❌ Error parsing user from localStorage:", error);
            }
        }
    }, []);

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("user"); 
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: "#007bff", fontWeight: "bold", fontSize: "1.5rem" }}>
                    Quick Tour
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#userNavbarNav"
                    aria-controls="userNavbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="userNavbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
                    </ul>

                    <div className="d-flex align-items-center">
                        {user ? (
                            <div className="dropdown">
                                <button
                                    className="btn d-flex align-items-center"
                                    id="userDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <FaUserCircle size={30} className="me-2" />
                                    <span className="fw-bold">{user.first_name || "Unknown"}</span> 
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    <li><span className="dropdown-item-text fw-bold">User: {user.first_name || "N/A"}</span></li>
                                    <li><span className="dropdown-item-text">Mobile: {user.mobile_no || "N/A"}</span></li>
                                    <li><span className="dropdown-item-text">Role: {user.role || "N/A"}</span></li>
                                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <button className="btn btn-outline-primary me-2" onClick={() => navigate("/login")}>Login</button>
                                <button className="btn btn-primary" onClick={() => navigate("/signup")}>Signup</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
