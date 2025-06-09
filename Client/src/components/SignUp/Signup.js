import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaSpinner } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    role: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    carNumber: "",
    aadharNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.mobile_no || formData.mobile_no.length < 10) newErrors.mobile_no = "Invalid mobile number";
    if (!formData.role) newErrors.role = "Please select a role";
    if (!passwordRegex.test(formData.password)) newErrors.password = "Password must be 8+ chars with at least one number & special character";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (formData.role === "driver") {
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
      if (!formData.carNumber.trim()) newErrors.carNumber = "Car number is required";
      if (!formData.aadharNumber.trim()) newErrors.aadharNumber = "Aadhar number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // ✅ Fix role before sending the request
    const updatedUser = {
      ...formData,
      role: formData.role === "rider" ? "user" : "driver", // Convert "rider" to "user"
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setErrors({ apiError: data.message || "Signup failed." });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrors({ apiError: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Sign Up</h2>

        {errors.apiError && <p className="text-red-500 text-center">{errors.apiError}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <PhoneInput
            defaultCountry="IN"
            value={formData.mobile_no}
            onChange={(value) => setFormData({ ...formData, mobile_no: value })}
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          {errors.mobile_no && <p className="text-red-500">{errors.mobile_no}</p>}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border rounded"
          >
            <option value="">Select a role</option>
            <option value="rider">Rider</option>
            <option value="driver">Driver</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role}</p>}

          {formData.role === "driver" && (
            <>
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              {errors.licenseNumber && <p className="text-red-500">{errors.licenseNumber}</p>}

              <input
                type="text"
                name="carNumber"
                placeholder="Car Number"
                value={formData.carNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              {errors.carNumber && <p className="text-red-500">{errors.carNumber}</p>}

              <input
                type="text"
                name="aadharNumber"
                placeholder="Aadhar Number"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              {errors.aadharNumber && <p className="text-red-500">{errors.aadharNumber}</p>}
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {loading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
