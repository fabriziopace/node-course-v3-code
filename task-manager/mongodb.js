// CRUD  create read update delete
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    };

    const db = client.db(databaseName);

    // CREATE
    // db.collection('users').insertOne({
    //     name: 'Vikram',
    //     age: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     };

    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([{
    //     name: 'Jen',
    //     age: 20
    // }, {
    //     name: 'Gunther',
    //     age: 27
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!');
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([{
    //     description: 'Task 1',
    //     completed: true
    // }, {
    //     description: 'Task 2',
    //     completed: false
    // }, {
    //     description: 'Task 3',
    //     completed: true
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!');
    //     }
    //     console.log(result.ops);
    // });

    // READ
    db.collection('tasks').findOne({ _id: new ObjectID('5d95f99c47cbca02b858bfc9') }, (error, task) => {
        if (error) {
            return console.log('Unable to fetch');
        }

        console.log(task);
    });

    db.collection('tasks').find({ completed: false }).toArray((error, tasknotcompleted) => {
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log(tasknotcompleted);
    })

    //UPDATE

    //DELETE

});