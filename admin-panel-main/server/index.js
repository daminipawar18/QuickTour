const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "rideshare_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("MySQL connected");
});

// Get all users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching users", error: err });
    }
    res.status(200).json(results);
  });
});

// Get a user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching user", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(results[0]);
  });
});

// Create a new user
app.post("/api/users", (req, res) => {
  const { username, email, phonenumber, gender, password } = req.body;

  if (!username || !email || !phonenumber || !gender || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO users (username, email, phonenumber, gender, password) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [username, email, phonenumber, gender, password],
    (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Error saving user" });
      }
      res
        .status(201)
        .json({ message: "User added successfully", userId: result.insertId });
    }
  );
});

// Update user (PUT)
app.put("/api/users/:id", (req, res) => {
  const { username, email, phonenumber, gender, password } = req.body;
  const userId = req.params.id;

  if (!username || !email || !phonenumber || !gender || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "UPDATE users SET username = ?, email = ?, phonenumber = ?, gender = ?, password = ? WHERE id = ?";

  db.query(
    sql,
    [username, email, phonenumber, gender, password, userId],
    (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Error updating user" });
      }
      res.status(200).json({ message: "User updated successfully" });
    }
  );
});
// Delete a user
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting user", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
});

// Get all policies
app.get("/api/policies", (req, res) => {
  db.query("SELECT * FROM policies", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching policies", error: err });
    }
    res.status(200).json(results);
  });
});

// Get a policy by ID
app.get("/api/policies/:id", (req, res) => {
  const policyId = req.params.id;
  db.query(
    "SELECT * FROM policies WHERE id = ?",
    [policyId],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching policy", error: err });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Policy not found" });
      }
      res.status(200).json(results[0]);
    }
  );
});

// Create a new policy
app.post("/api/policies", (req, res) => {
  const { title, content } = req.body;
  db.query(
    "INSERT INTO policies (title, content) VALUES (?, ?)",
    [title, content],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating policy", error: err });
      }
      res.status(201).json({ id: results.insertId, title, content });
    }
  );
});

// Update a policy
app.put("/api/policies/:id", (req, res) => {
  const policyId = req.params.id;
  const { title, content } = req.body;
  db.query(
    "UPDATE policies SET title = ?, content = ? WHERE id = ?",
    [title, content, policyId],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating policy", error: err });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Policy not found" });
      }
      res.status(200).json({ id: policyId, title, content });
    }
  );
});

// Delete a policy
app.delete("/api/policies/:id", (req, res) => {
  const policyId = req.params.id;
  db.query("DELETE FROM policies WHERE id = ?", [policyId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting policy", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Policy not found" });
    }
    res.status(200).json({ message: "Policy deleted successfully" });
  });
});



app.get("/api/feedbacks", (req, res) => {
  db.query("SELECT * FROM feedback", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching feedback", error: err });
    }
    res.status(200).json(results);
  });
});


// Get all rides progress
app.get("/api/rides", (req, res) => {
  db.query("SELECT * FROM progress", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching rides progress", error: err });
    }
    res.status(200).json(results);
  });
});


// Get ride statistics
app.get("/api/rides/statistics", (req, res) => {
  // Current date
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Set to the start of the week (Sunday)

  // Query to get today's rides and weekly rides
  const query = `
    SELECT 
      COUNT(*) AS total_rides,
      SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS today_rides,
      SUM(CASE WHEN DATE(created_at) >= ? THEN 1 ELSE 0 END) AS weekly_rides
    FROM progress
  `;

  db.query(query, [startOfWeek], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching ride statistics", error: err });
    }
    const { today_rides, weekly_rides } = results[0];
    res.status(200).json({ todayRides: today_rides, weeklyRides: weekly_rides });
  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



