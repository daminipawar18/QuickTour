import React, { useState, useEffect } from "react";
import "./PaymentManagement.css"; // ✅ Ensure this file exists in the same directory

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payments from API
    fetch("/api/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error("Error fetching payments:", err));
  }, []);

  return (
    <div className="payment-management">
      <h2 className="title">Payment Management</h2>
      <div className="table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.user}</td>
                  <td className={payment.status.toLowerCase()}>{payment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
