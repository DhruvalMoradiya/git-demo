const express = require('express');
const bodyparser = require('body-parser');
const route = require('./route/route.js');
const mongoose = require('mongoose');
const multer = require("multer")

const app = express();

app.use(bodyparser.json());
app.use(multer().any());

const url = "mongodb+srv://dhirajpatil:XuEAzywgRheQB7B1@cluster0.0v32f.mongodb.net/group23Database?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser: true,}).then(()=>console.log('MongoDB is connected')).catch(err => console.log(err));

app.use('/',route)

app.listen(process.env.PORT || 3001, function(){
    console.log('express app running on PORT' + (process.env.PORT || 3000))
});



