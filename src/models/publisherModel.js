const mongoose = require('mongoose');

const publisherSchema  = mongoose.Schema({

    name:String,
    headQuarter:String
    
}, { timestamps: true })

module.exports = mongoose.model('newPublisher',publisherSchema)