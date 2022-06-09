const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require('../models/publisherModel')
const { populate } = require('../models/bookModel')


const createBook = async function (req, res) {
    let getData = req.body
    let authId = getData.author
    let PublId = getData.publisher
    console.log(!authId)
    if (!authId || !PublId) {
      res.send({ warning: "please anter valid author id and publ id" })
    } else {
      let ValidAuthId = await authorModel.findById(authId)
      let validPublId = await publisherModel.findById(PublId)
      if (!ValidAuthId || !validPublId) {
        res.send({ warning: "Please enter valid ID" })
      } else {
        let createData = await bookModel.create(getData)
        res.send({ Bookdata: createData })
      }
    }
  
  }
  
  const fetchAllData = async function (req, res) {
    const getData = await bookModel.find().populate(['author','publisher'])
    console.log(getData)
    res.send({ Data: getData })
  }

  const updateBook = async function (req, res) {
    const getPub =await bookModel.updateMany({"publisher" : "62a1dc3680b56865fc866ba9"},{ IsHardCover : true})
  
    res.send({ Data: getPub })
  }

  const BooksUpdatePrice = async function (req, res) {
    let savedData = await bookModel.updateMany(
      { ratings: { $gt: 3.5 } },
      { $inc: { price: 10 } },
      
    );
    let Updated = await bookModel.find({ ratings: { $gt: 3.5 } });
    res.send({ msg: savedData, data: Updated });
  };
module.exports.createBook= createBook
module.exports.fetchAllData= fetchAllData
module.exports.updateBook= updateBook
module.exports.BooksUpdatePrice= BooksUpdatePrice