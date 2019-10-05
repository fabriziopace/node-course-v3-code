// PROMISE CHAINING
require('../src/db/mongoose'); // db connection
const Task = require('../src/models/task');

Task.findByIdAndDelete('5d98bffbe8085b08c0c90bcc').then((task) => { // find by id promise
    return Task.countDocuments({ completed: false });
}).then((result) => { // countDocuments promise
    console.log(result);
}).catch((error) => { // find and count promises error
    console.log(error);
});

// ASYNC FUNCTION / AWAIT
const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
};
deleteTaskAndCount('5d98da99810c261dc0a4d654').then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
});