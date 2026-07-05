const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

// In-memory database
let tasks = [
  { id: 1, title: "Sample Task", assignee: "You", priority: "High", status: "To Do" }
];

// API Routes
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const task = { id: Date.now(), status: "To Do", ...req.body };
  tasks.push(task);
  res.json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = req.body.status;
  }
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ success: true });
});

// Serve Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Vercel ku export pannanum
module.exports = app;
