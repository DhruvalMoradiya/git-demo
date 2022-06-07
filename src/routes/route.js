const express = require('express');
const router = express.Router();
// const bookModel= require("../models/bookModel.js")
// const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController.js")




router.post("/createBook", BookController.createBook  )

router.get("/booksList", BookController.getBooksList)
router.post("/getBooksInYear", BookController.getBookInYear)
router.post("/getParticularBooks", BookController.getParticularBooks)
router.get("/getXINRBooks", BookController.getXINRBooks)
router.get("/getRandomBooks", BookController.getRandomBooks)
module.exports = router;