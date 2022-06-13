const mongoose = require('mongoose');
ObjectId = mongoose.Schema.Types.ObjectId

const orderModel = new mongoose.Schema( {
    userID :{
               type : ObjectId,
               ref : "MyNewUser"
    },
    productID : {
        type : ObjectId,
        ref : "product"
    },
    amount : Number,
    isFreeAppUser : Boolean,
    date : {type : Date, default : Date.now()}
},

{ timestamps: true });
module.exports = mongoose.model('order', orderModel)

