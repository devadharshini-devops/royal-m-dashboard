const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Local 
mongoose.connect("mongodb+srv://test:test123@cluster0.mongodb.net/projecttool");
// Task Schema
const TaskSchema = new mongoose.Schema({
  title: String,
  project: String,
  assignedTo: String,
  deadline: Date,
  status: { type: String, default: "Todo" }
});

const Task = mongoose.model("Task", TaskSchema);

// API 1: Task add panradhu
app.post("/addtask", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send("Task Added ✅");
});

// API 2: Ellam task eduka
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// API 3: Status update panradhu
app.put("/updatestatus/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.send("Status Updated ✅");
});

app.listen(5000, () => console.log("Server running on 5000 ✅"));