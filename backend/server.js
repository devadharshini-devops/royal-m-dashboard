const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB Connected"))
.catch(err=> console.log(err));

const Task = mongoose.model("Task", {
  title:String,
  project:String,
  assigned:String,
  due:String,
  status:{ type: String, default: "To Do" } 
});

app.get("/tasks", async (req,res)=> { res.json(await Task.find()) });

app.post("/tasks", async (req,res)=> { res.json(await Task.create(req.body)) });

app.put("/tasks/:id", async (req,res)=> { 
  res.json(await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})) 
});

app.listen(3000);
