const mongoose = require('mongoose');
const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, // ID OF USER
        required: true,
        ref: 'User' // Reference relationship
    }
});


module.exports = Task;