const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI) 
.then(()=> console.log("DB Connected"))
.catch(err=> console.log(err));

const Task = mongoose.model("Task", {title:String,project:String,assigned:String,due:String,status:String});

app.get("/tasks", async (req,res)=> { res.json(await Task.find()) });
app.post("/tasks", async (req,res)=> { res.json(await Task.create(req.body)) });

app.listen(5000);
