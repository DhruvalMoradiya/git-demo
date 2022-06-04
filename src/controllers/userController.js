const bookModel= require("../models/bookModel.js")

const userBook= async function (req, res) {
    let data= req.body
    let addB= await bookModel.create(data)
    res.send({msg: addB})
}

const getBookData= async function (req, res) {
    let Book= await bookModel.find()
    res.send({msg: Book})
}

module.exports.userBook= userBook
module.exports.getBookData= getBookData