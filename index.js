const express = require('express');
const Dog = require('./models/dogs.js');
const app = express();

app.post('/dogs', async (req, res) => {

    Dog
        .insert(req.body)
        .then(dog => res.send(dog));
});

app.get('/dogs', (req, res) => {
    Dog
        .findById(req.body)
        .then(dog => res.send(dog));
});

module.exports = app;
app.get('/dogs', (req, res) => {
    Dog
        .find()
        .then(dog => res.send(dog));
});

module.exports = app;
app.delete('/dogs', (req, res) => {
    Dog
        .delete(req.body)
        .then(dog => res.send(dog));
});
module.exports = app;
app.put('/dogs', (req, res) => {
    Dog
        .update(req.body)
        .then(dog => res.send(dog));
});

module.exports = app;
