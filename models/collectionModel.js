const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    identifier: { type: Number },
    collectionName: { type: String, require: true,},
    publisher: { type: String, require:true},
    collectionImage: { type: String, require: true }
    

}, { timestamps: true })

module.exports = mongoose.model('Collection', collectionSchema)