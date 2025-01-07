const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./users.db");

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Initialize Database
db.run(
  `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        email TEXT UNIQUE,
        phoneNumber TEXT,
        password TEXT
    )`,
  (err) => {
    if (err) {
      console.error("Error creating database table:", err.message);
    } else {
      console.log("User table initialized.");
    }
  }
);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Signup-Login API!");
});

// Signup Endpoint
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if email already exists in the database
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], async (err, existingUser) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error." });
    }

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    try {
      // Hash the password asynchronously using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const insertQuery = `INSERT INTO users (firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)`;
      db.run(
        insertQuery,
        [firstName, lastName, email, phoneNumber, hashedPassword],
        function (err) {
          if (err) {
            return res.status(500).json({ message: "Failed to create user." });
          }
          res.status(201).json({ message: "User created successfully!" });
        }
      );
    } catch (error) {
      return res.status(500).json({ message: "Error hashing password." });
    }
  });
});

// Login Endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error." });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, isPasswordValid) => {
      if (err) {
        return res.status(500).json({
          message: "Internal server error during password comparison.",
        });
      }

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      res.status(200).json({ message: `Welcome, ${user.firstName}!` });
    });
  });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
