const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel=require("../models/authorModel");

const createBook = async function(req, res){
    const books = req.body;
    const showBooks = await BookModel.create(books);
    res.send( { data: showBooks } );
}

const addAuthor = async function(req, res){
    const author = req.body;
    const showAuthor = await AuthorModel.create(author);
    res.send( { data: showAuthor } );
}   

const bookbyChetanBhagat = async function(req, res){
    const showAuthor = await AuthorModel.findOne({author_name: "Chetan Bhagat"});
    
   
    const getAuthorID = showAuthor.author_id;
    
    const allBooks = await BookModel.find({ author_id: getAuthorID }).select({ bookName: 1, _id: 0 });
    res.send( { data: allBooks } );
}

const updateBookPrice = async function (req, res) {
    let bookDetail = await BookModel.find({name: "Two states"})
    let id = bookDetail[0].author_id
    let authorN = await AuthorModel.find({author_id : id}).select({author_name:1, _id:0 })

    const bkName = bookDetail[0].name
    const updatedPrice = await BookModel.findOneAndUpdate(
        {name:bkName}, 
        {price:100}, 
        {new:true}
        ).select({price:1, _id:0})
    res.send({msg: authorN, updatedPrice})
}

const findBooks = async function(req, res){
    const getBookPrice = await BookModel.find({ price: {$gte: 50, $lte: 100} }).select({ author_id: 1, _id: 0 });

    let getAuthorNames=[]
    for(let i = 0; i < getBookPrice.length; i++){
        const getAuthorID = getBookPrice[i].author_id;
        getAuthorNames = await AuthorModel.findOne({ author_id: getAuthorID }).select({ author_name: 1, _id: 0 });
    }
    
    res.send( { data: getAuthorNames } );
}



module.exports.createBook = createBook;
module.exports.addAuthor = addAuthor;
module.exports.bookbyChetanBhagat = bookbyChetanBhagat;
module.exports.updateBookPrice = updateBookPrice;
module.exports.findBooks = findBooks;
