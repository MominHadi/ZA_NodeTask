const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Port = 8082
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
//Parsing Json data---
app.use(bodyParser.json());



app.use('/auth', authRoutes);


mongoose.connect(`mongodb+srv://hadi:jimmychoo@cluster0.t1v4y.mongodb.net/blogApi`)
    .then(response => {
        app.listen(Port);
        console.log(`Express App Listening to ${Port}`)
    })
    .catch(error => {
        console.log(error, 'Database Connection Error')
    })
