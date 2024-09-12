const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Port = 8082

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

//Parsing Json data from incoming Request fro client-Side
app.use(bodyParser.json());

//Using for User create and login
app.use('/auth', authRoutes);

//Used for CRUD and other APIs
app.use('/blogApp', postRoutes);


mongoose.connect(`mongodb+srv://hadi:jimmychoo@cluster0.t1v4y.mongodb.net/blogApi`)
    .then(response => {
        app.listen(Port);
        console.log(`Express App Listening to ${Port}`)
    })
    .catch(error => {
        console.log(error, 'Database Connection Error')
    })
