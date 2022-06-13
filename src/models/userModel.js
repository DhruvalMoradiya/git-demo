const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name : String,
    balance : {
        type : Number,
        default : 100
    },
    age : String,
    gender : {
        type : String,
        enum : ["male","female","other"]
    },
    isFreeAppUser : {
        type: Boolean,
        default : false
    }
}, { timestamps: true });

module.exports = mongoose.model('MyNewUser', userSchema)


