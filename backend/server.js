const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors()); // MUKKIYAM: Indha line illana frontend connect aagathu
app.use(express.json());

mongoose.connect("YOUR_MONGODB_LINK", {useNewUrlParser: true, useUnifiedTopology: true});

const TaskSchema = new mongoose.Schema({
  title: String,
  project: String,
  assigned: String,
  due: String,
  status: {type: String, default: "Todo"}
});
const Task = mongoose.model("Task", TaskSchema);

app.get("/tasks", async (req,res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req,res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.put("/tasks/:id", async (req,res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({msg:"Updated"});
});

app.delete("/tasks/:id", async (req,res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({msg:"Deleted"});
});

app.listen(5000, () => console.log("Server running"));
