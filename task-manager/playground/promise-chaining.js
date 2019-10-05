require('../src/db/mongoose'); // db connection
const User = require('../src/models/user');

// PROMISE CHAINING
User.findByIdAndUpdate('5d98c6f24db4bf2f34022f1d', {
    age: 1
}).then((user) => {
    console.log(user);

    return User.countDocuments({
        age: 1
    })
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return count;
};

updateAgeAndCount('5d98c6f24db4bf2f34022f1d', 2).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
});