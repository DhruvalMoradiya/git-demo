const AuthorModel = require('../models/authorModel')

const createAuthor = async function(req,res){
    let data = req.body
    let  getAuthorData  =  await AuthorModel.create(data)
    res.send({data:getAuthorData})
}


module.exports.createAuthor =createAuthor