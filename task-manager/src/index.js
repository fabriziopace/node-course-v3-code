const express = require('express');
require('./db/mongoose'); // db connection
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());



// Create New User
app.post('/users', async(req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Read All Users
app.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Read One User By Id
app.get('/users/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Create New Task
app.post('/tasks', async(req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Read All Tasks
app.get('/tasks', async(req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Read One Task By Id
app.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id; //obtain the parameter id

    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});