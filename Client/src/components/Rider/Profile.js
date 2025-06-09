import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit, FaSave } from "react-icons/fa";
import "./Profile.css"; // Import styles

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ mobile_no: "", address: "" });

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && typeof storedUser === "object") {
        setUser(storedUser);
        setFormData({ 
          mobile_no: storedUser.mobile_no || "", 
          address: storedUser.address || "" 
        });
      } else {
        console.error("Invalid user data in localStorage");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.mobile_no.trim() || !formData.address.trim()) {
      alert("Fields cannot be empty!");
      return;
    }

    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    setIsEditing(false);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  if (!user) {
    return <p className="loading-text">Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <FaUserCircle className="profile-icon" />
          <h2>{user.first_name || "User"}</h2>
        </div>

        <div className="profile-details">
          <p><strong>Email:</strong> {user.email || "Not provided"}</p>
          <p><strong>Role:</strong> {user.role || "User"}</p>

          <p><strong>Mobile:</strong>  
            {isEditing ? (
              <input type="text" name="mobile_no" value={formData.mobile_no} onChange={handleChange} />
            ) : (
              ` ${user.mobile_no || "Not provided"}`
            )}
          </p>

          <p><strong>Address:</strong>  
            {isEditing ? (
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            ) : (
              ` ${user.address || "Not provided"}`
            )}
          </p>
        </div>

        <button className="edit-btn" onClick={isEditing ? handleSave : handleEdit}>
          {isEditing ? <><FaSave /> Save</> : <><FaEdit /> Edit</>}
        </button>
      </div>
    </div>
  );
};

export default Profile;
