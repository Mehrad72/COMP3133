const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Users = require('./users.js');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const DB_URL = 'mongodb+srv://mehrad72:yZCk4KpLViZgXQP5@data-base.6fusqhj.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.post('/users', (req, res) => {
    fs.readFile('./UsersData.json', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to read data file!'
            });
        }
        const usersData = JSON.parse(data);
        Users.insertMany(usersData)
            .then(result => {
                res.status(201).json({
                    message: 'Users created successfully!',
                    result: result
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: 'Failed to create users!'
                });
            });
    });
});

app.listen(3000, function() {
    console.log('App listening on port 3000');
  });
  