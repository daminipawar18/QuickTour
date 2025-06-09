import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./NavBar"; // Ensure correct file reference
import RiderNavbar from "../Rider/RiderNavbar";

const NavbarWrapper = () => {
    const location = useLocation();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserRole(parsedUser.role);
            } catch (error) {
                console.error("❌ Error parsing user role:", error);
            }
        }
    }, [location]);

    // 🚀 **Pages that should NOT have any navbar at all**
    const hideNavbarPaths = ["/login", "/signup"];
    if (hideNavbarPaths.includes(location.pathname)) return null;

    // 🚀 **Pages that should ONLY have RiderNavbar (not homepage Navbar)**
    const riderPages = [
        "/rider-dashboard",
        "/my-rides",
        "/ride-history",
        "/profile",
        "/driver-list",
        "/chat", // ✅ Added Chat Page
        "/booking-confirmation",
        "/ride-trcaking" ,
        "/payment-success" ,
        
        
        
        

        // ✅ Added Ride Confirmation Page
    ];

    return riderPages.includes(location.pathname) ? <RiderNavbar /> : <Navbar />;
};

export default NavbarWrapper;
