const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const app = express();
app.use(cors());
app.use(express.json());

// ===== Database Connection =====
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",   // put your MySQL password if you set one
  database: "smart_task_manager"
});
db.connect(err => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});
const SECRET = "smarttasksecret";
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

// ===== Test Route =====
app.get("/", (req, res) => {
  res.send("Backend is running");
});
// ===== Register =====
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ error: "User already exists" });
        res.json({ message: "User registered successfully" });
      }
    );
  } catch {
    res.status(500).json({ error: "Registration failed" });
  }
});
// ===== Login =====
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (result.length === 0) return res.status(401).json({ error: "User not found" });

      const user = result[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) return res.status(401).json({ error: "Wrong password" });

      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "2h" });
      res.json({ message: "Login successful", token });
    }
  );
});
// ===== Get Tasks =====
app.get("/tasks", verifyToken, (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    }
  );
});
// ===== Add Task =====
app.post("/tasks", verifyToken, (req, res) => {
  const { text, priority, due_date } = req.body;

  db.query(
    "INSERT INTO tasks (user_id, text, priority, due_date) VALUES (?,?,?,?)",
    [req.userId, text, priority, due_date],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Task added" });
    }
  );
});
// ===== Update Task =====
app.put("/tasks/:id", verifyToken, (req, res) => {
  const { text, priority, completed } = req.body;
  const taskId = req.params.id;

  db.query(
    "UPDATE tasks SET text=?, priority=?, completed=? WHERE id=? AND user_id=?",
    [text, priority, completed, taskId, req.userId],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Task updated" });
    }
  );
});
// ===== Delete Task =====
app.delete("/tasks/:id", verifyToken, (req, res) => {
  const taskId = req.params.id;

  db.query(
    "DELETE FROM tasks WHERE id=? AND user_id=?",
    [taskId, req.userId],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Task deleted" });
    }
  );
});

// ===== Start Server =====
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
