const express = require('express');
const cors = require('cors');
const path = require('path'); // idhuvum add pannu
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/api/tasks', (req, res) => { res.json(tasks); });
app.post('/api/tasks', (req, res) => { const task = { id: Date.now(), ...req.body }; tasks.push(task); res.json(task); });
app.put('/api/tasks/:id', (req, res) => { const id = parseInt(req.params.id); const task = tasks.find(t => t.id === id); if (task) { task.status = req.body.status; res.json(task); } else { res.status(404).json({ error: 'Task not found' }); } });
app.delete('/api/tasks/:id', (req, res) => { const id = parseInt(req.params.id); tasks = tasks.filter(t => t.id !== id); res.json({ success: true }); });


app.use(express.static(path.join(__dirname, '../frontend')));
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../frontend/index.html')); });

module.exports = app;
