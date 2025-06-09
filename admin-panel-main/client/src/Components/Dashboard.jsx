// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios"; // Import axios for making API requests
import "./Dashboard.css";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [todayRides, setTodayRides] = useState(0);
  const [weeklyRides, setWeeklyRides] = useState(0);

  // Fetching data from API
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get("http://localhost:5000/api/rides");
        setUserCount(userResponse.data.length); // Assuming the user endpoint returns an array

        // Fetch ride statistics
        const rideResponse = await axios.get(
          "http://localhost:5000/api/rides/statistics"
        );
        setTodayRides(rideResponse.data.todayRides);
        setWeeklyRides(rideResponse.data.weeklyRides);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  // Data for Bar Chart
  const data = {
    labels: ["Today's Rides", "Weekly Rides"],
    datasets: [
      {
        label: "Rides Count",
        data: [todayRides, weeklyRides],
        backgroundColor: ["#3498db", "#2ecc71"],
        borderWidth: 1,
      },
    ],
  };

  // Options for Bar Chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat">
          <h3>Total Users</h3>
          <p>{13}</p>
        </div>
        <div className="stat">
          <h3>Today Rides</h3>
          <p>{8}</p>
        </div>
        <div className="stat">
          <h3>Weekly Rides</h3>
          <p>{6}</p>
        </div>
      </div>
      <div className="chart">
        <h2>Ride Statistics</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
