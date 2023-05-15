const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fristName: { type: String,  required: true,trim: true,},

    lastName: { type: String, required: true,trim: true, },

    email: { type: String, required: true, unique: true,trim: true, },

    otp:{type:String,required:true,trim: true,},

    password: { type: String, required: true,trim: true,},

    deletedAt: { type: Date },
    
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)