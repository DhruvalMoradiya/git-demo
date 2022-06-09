const mongoose = require('mongoose');

const bookSchema  = mongoose.Schema({

    name:String,
    author:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "newAuthor"
    },
    price : Number,
    rating : Number,
    publisher:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "newPublisher"
    },
    IsHardCover:{
        type : Boolean,
        default : false
    },

}, { timestamps: true })

module.exports = mongoose.model('newestBook',bookSchema)
