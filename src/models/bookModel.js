const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
  bookName:{
      type:String,
      required:true
  },
  author_id:{
    type:Number,
    required:true
},
price:Number,
ratings:Number,
}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema) //users
