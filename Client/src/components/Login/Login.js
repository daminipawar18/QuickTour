import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Use named import
import "./login.css";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Store user data safely in localStorage
    const storeUserData = (user, token) => {
        try {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);

            if (user.role === "driver" && user.driver_id) {
                localStorage.setItem("driver_id", user.driver_id); // ✅ Store driver_id only for drivers
            } else {
                localStorage.removeItem("driver_id"); // ❌ Remove driver_id for non-drivers
            }

            console.log("✅ User data saved to localStorage:", user);
        } catch (storageError) {
            console.error("❌ LocalStorage Error:", storageError);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password: password.trim() }),
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error("❌ JSON Parsing Error:", jsonError);
                setError("Server error. Please try again.");
                setLoading(false);
                return;
            }

            console.log("🔍 API Response:", data);

            if (!response.ok) {
                setError(data?.message || "Invalid email or password.");
                setLoading(false);
                return;
            }

            if (data.token && data.user) {
                let decodedToken;
                try {
                    decodedToken = jwtDecode(data.token); // ✅ Decode JWT safely
                } catch (decodeError) {
                    console.error("❌ JWT Decoding Error:", decodeError);
                    setError("Login successful, but token is invalid.");
                    setLoading(false);
                    return;
                }

                const userId = decodedToken?.user_id || data.user.id || null;
                const driverId = data.user.driver_id || null; // ✅ Get driver_id from API response

                if (!data.user.role) {
                    console.error("🚨 User role missing in API response!");
                    setError("Login successful, but user role is undefined.");
                    setLoading(false);
                    return;
                }

                // ✅ Ensure role is always lowercase & default to 'rider' if 'user'
                const userRole = data.user.role.toLowerCase() === "user" ? "rider" : data.user.role.toLowerCase();

                const userData = {
                    id: userId,
                    driver_id: driverId, // ✅ Store driver_id if available
                    first_name: data.user.first_name?.trim() || "Unknown",
                    email: data.user.email || "Not Provided",
                    mobile_no: data.user.mobile_no || "Not Provided",
                    address: data.user.address || "Not Provided",
                    role: userRole,
                };

                storeUserData(userData, data.token);
                setUser(userData);

                console.log("🚀 Redirecting User Role:", userData.role);

                // ✅ Role-based Redirection
                switch (userData.role) {
                    case "rider":
                        navigate("/rider-dashboard");
                        break;
                    case "driver":
                        navigate("/driver-dashboard");
                        break;
                    case "admin":
                        navigate("/admin-dashboard");
                        break;
                    default:
                        navigate("/");
                        break;
                }
            } else {
                setError("Login successful, but user data is missing!");
            }
        } catch (err) {
            console.error("❌ Login Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
