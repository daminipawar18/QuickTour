import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const location = useLocation();

    console.log("🔐 User Authentication Check:", user);

    if (!user?.role) {
        console.warn("🚫 Unauthorized! Redirecting to Login.");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // ✅ Ensure "user" is correctly mapped to "rider"
    const userRole = user.role.toLowerCase() === "user" ? "rider" : user.role.toLowerCase();

    // ✅ Debugging: Check Allowed Roles
    console.log(`🛑 Checking Access: ${userRole} vs Allowed:`, allowedRoles);

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        console.warn(`⚠️ Access Denied! User role: ${userRole}. Redirecting to Home.`);
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
