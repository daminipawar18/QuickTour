import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';  // Added import for toast notifications
import ProtectedRoute from "./components/ProtectedRoute";
import NavbarWrapper from "./components/HomePage/NavbarWrapper";
import Footer from "./components/HomePage/Footer";
import Home from "./components/HomePage/Home";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import AboutUs from "./components/HomePage/AboutUs";
import ContactUs from "./components/HomePage/ContactUs";
import PopularRides from "./components/User/PopularRides";
import YourRides from "./components/User/YourRides";
import PaymentComponent from "./components/Payments/PaymentComponent";  // Imported PaymentComponent
import PaymentSuccess from "./components/Payments/PaymentSuccess";  // Imported PaymentSuccess
import PopularRidesDriver from "./components/Driver/PopularRidesDriver";
import ContactDriver from "./components/Driver/ContactDriver";
import AboutDriver from "./components/Driver/AboutDriver";
import Refer from "./components/HomePage/Refer";
import Safety from "./components/HomePage/Safety";
import AboutUser from "./components/User/AboutUser";
import ContactUser from "./components/User/ContactUser";
import UserProfile from "./components/User/UserProfile";
import DriverProfile from "./components/Driver/DriverProfile";
import UpdatePassword from "./components/Login/UpdatePassword";
import RideResults from "./components/User/RideList";
import Search from "./components/HomePage/Search";
import DriverList from "./components/Driver/DriverList";
import RiderDashboard from "./components/Rider/RiderDashboard";
import RideTracking from "./components/Rider/RideTracking";  // Already included
import Profile from "./components/Rider/Profile";
import BookingConfirmation from "./components/Driver/BookingConfirmation";
import Chat from "./components/Driver/Chat";
import History from "./components/Rider/History";
import MyRides from "./components/Rider/MyRides";
import BookRide from "./components/Rider/BookRide";
import DriverDashboard from "./components/Driver/DriverDashboard";
import NavbarDriver from "./components/Driver/DriverNavbar";

const App = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Fetch user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ Redirect user to dashboard based on role
    useEffect(() => {
        if (user?.role === "rider" && location.pathname === "/") {
            navigate("/rider-dashboard");
        } else if (user?.role === "driver" && location.pathname === "/") {
            navigate("/driver-dashboard");
        }
    }, [user, location.pathname, navigate]);

    // ✅ Hide Navbar & Footer on login/signup pages
    const hideOnAuthPages = ["/login", "/signup"].includes(location.pathname);

    return (
        <>
            {/* ✅ Show Navbar based on role */}
            {!hideOnAuthPages && (user?.role === "driver" ? <NavbarDriver /> : <NavbarWrapper />)}

            <Routes>
                {/* 🌐 Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route path="/forgot-password" element={<UpdatePassword />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/rides" element={<PopularRides />} />
                <Route path="/search" element={<Search />} />
                <Route path="/driver-list" element={<DriverList />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/ride-results" element={<RideResults />} />
                <Route path="/book-ride/:id" element={<BookRide />} />

                {/* Add route for Payment */}
                <Route path="/payment" element={<PaymentComponent />} />  {/* Added PaymentComponent route */}
                <Route path="/payment-success" element={<PaymentSuccess />} />  {/* Added PaymentSuccess route */}

                {/* 🔐 Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={["rider", "driver", "admin"]} />} >
                    <Route path="/safety" element={<Safety />} />
                    <Route path="/refer" element={<Refer />} />
                </Route>

                {/* 🚗 Rider-Specific Routes */}
                <Route element={<ProtectedRoute allowedRoles={["rider"]} />} >
                    <Route path="/rider-dashboard" element={<RiderDashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/my-rides" element={<MyRides />} />
                    <Route path="/ride-history" element={<History />} />
                    <Route path="/ride-tracking" element={<RideTracking />} />  {/* Already included */}
                </Route>

                {/* 🚗 Driver-Specific Routes */}
                <Route element={<ProtectedRoute allowedRoles={["driver"]} />} >
                    <Route path="/driver-dashboard" element={<DriverDashboard />} />
                    <Route path="/rides-driver" element={<PopularRidesDriver />} />
                    <Route path="/contact-driver" element={<ContactDriver />} />
                    <Route path="/about-driver" element={<AboutDriver />} />
                    <Route path="/driverprofile" element={<DriverProfile />} />
                </Route>

                {/* 🛠 User-Specific Routes */}
                <Route element={<ProtectedRoute allowedRoles={["rider", "driver"]} />} >
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/user-about" element={<AboutUser />} />
                    <Route path="/user-contact" element={<ContactUser />} />
                </Route>
            </Routes>

            {!hideOnAuthPages && <Footer />}

            {/* ✅ Add this: It will render toast notifications globally */}
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default App;
