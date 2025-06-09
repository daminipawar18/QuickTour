import axios from "axios";
import { useEffect, useState } from "react";
import './DriverManagement.css';  // Import CSS file

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);

  // Fetch drivers from the backend
  const fetchDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/drivers");
      setDrivers(res.data.drivers);
    } catch (err) {
      console.error("❌ Error fetching drivers:", err);
    }
  };

  // Simulate edit driver
  const handleEdit = (driverId) => {
    alert(`Edit Driver with ID: ${driverId}`);
    // You can later replace this with actual edit functionality (e.g., showing a form to edit driver details)
  };

  // Simulate delete driver
  const handleDelete = (driverId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Driver with ID: ${driverId}?`);
    if (confirmDelete) {
      alert(`Driver with ID: ${driverId} deleted.`);
      // You can replace this with actual delete API call to remove the driver from the database
    }
  };

  // Fetch drivers on component mount
  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div className="driver-management-container">
      <h2 className="driver-management-title">Driver Management</h2>
      <table className="driver-table">
        <thead>
          <tr>
            <th>Driver ID</th>
            <th>Name</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.first_name}</td>
              <td>{driver.mobile_no}</td>
              <td>{driver.email}</td>
              <td className="actions">
                <button onClick={() => handleEdit(driver.id)} className="edit-btn">Add</button>
                <button onClick={() => handleDelete(driver.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverManagement;
