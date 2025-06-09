import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [isDirectAccess, setIsDirectAccess] = useState(false);

    useEffect(() => {
        setIsDirectAccess(true);
        sessionStorage.removeItem("paymentSuccess");
    }, []);

    if (!isDirectAccess) return null;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>🎉 Payment Successful! 🎉</h2>
                <p style={styles.subtext}>Thank you for your payment.</p>

                <div style={styles.details}>
                    <p><strong>🚗 Driver Name:</strong> Ritika</p>
                    <p><strong>💰 Amount Paid:</strong> ₹1300</p>
                    <p><strong>🔖 Transaction ID:</strong> #TXN123456789</p>
                    <p><strong>💳 Payment Method:</strong> UPI</p>
                </div>

                <p style={styles.message}>
                    Your transaction was successful. You will receive a confirmation shortly.
                </p>

                <button style={styles.button} onClick={() => navigate("/")}>
                    🚀 Visit Again - Quick Tour
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f9",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "400px",
    },
    heading: {
        color: "#27ae60",
        marginBottom: "10px",
    },
    subtext: {
        color: "#555",
        fontSize: "16px",
        marginBottom: "15px",
    },
    details: {
        backgroundColor: "#f9f9f9",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "15px",
        textAlign: "left",
    },
    message: {
        color: "#444",
        fontSize: "14px",
        marginBottom: "20px",
    },
    button: {
        backgroundColor: "#3498db",
        color: "#ffffff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default PaymentSuccess;
