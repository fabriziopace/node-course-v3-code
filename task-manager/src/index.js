const express = require('express');
require('./db/mongoose'); // db connection
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());

// use router for separate the various API (for example one file for User and another for Tasks operations)
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});