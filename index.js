require('dotenv').config();
const express = require('express');
// const { pipe } = require('superagent');
const Dog = require('./models/dogs.js');
const app = express();
app.use(express.json());

app.post('/dogs', async (req, res) => {

    Dog
        .insert(req.body)
        .then(dog => res.send(dog));
});

app.get('/dogs', (req, res) => {
    Dog
        .find()
        .then(dog => res.send(dog));
});

app.get('/dogs/:id', (req, res) => {
    Dog
        .findById(req.params.id)
        .then(dog => res.send(dog));
});



app.delete('/dogs/:id', (req, res) => {
    Dog
        .delete(req.params.id)
        .then(dog => res.send(dog));
});
app.put('/dogs/:id', (req, res) => {
    Dog
        .update(req.params.id, req.body)
        .then(dog => res.send(dog));
});

app.listen(3000, () => {
    console.log('app is listening at port 3000');
});


module.exports = app;
