import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css"; // ✅ Import CSS

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/users?role=user"); // ✅ Fixed API
        console.log("✅ Fetched Users Data:", response.data);
        setUsers(response.data);  // Save the fetched users data
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);  // Hide loading spinner
      }
    };

    fetchUsers();  // Fetch the users when component mounts
  }, []);

  // Handle edit action
  const handleEdit = (userId) => {
    console.log("Edit user with ID:", userId);
    // Here, you can either:
    // 1. Navigate to an edit page (using react-router)
    // 2. Open a modal with user data pre-filled for editing
    // For now, let's assume you would go to an edit page for that user.
    // Example:
    // history.push(`/edit-user/${userId}`);
  };

  // Handle delete action
  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/users/remove/${userId}`);
      console.log("User deleted:", res);
      setUsers(users.filter((user) => user.id !== userId));  // Remove deleted user from state
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      setError("Failed to delete the user. Please try again later.");
    }
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

      {loading ? (
        <p className="loading-text">Loading users...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : users.length === 0 ? (
        <p className="no-data-text">No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>{user.mobile_no}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
