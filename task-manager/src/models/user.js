const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //remove spaces
    },
    email: {
        type: String,
        unique: true, // avoid duplicate email in db
        required: true,
        trim: true,
        lowercase: true, // transform in lowercase
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0, // default value
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true // createdAt and updatedAt fields in db
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jsonwebtoken.sign({ _id: user._id.toString() }, 'thisismynewcourse');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login'); // wrong email
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login'); // wrong password
    }

    return user;
};

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8);
    };

    next();
});

// Delete all tasks when user is removed
userSchema.pre('remove', async function(next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;