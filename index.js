const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const {mongoose }= require('mongoose');
const app = express();
const multer = require('multer')

app.use(bodyParser.json());
app.use(multer().any())

let url = "mongodb+srv://dhruval:dhruval@cluster0.inaiyes.mongodb.net/test"
mongoose.connect(url, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

    
app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});