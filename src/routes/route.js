const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")


router.post("/createBook", BookController.createBook  )

router.post("/addAuthor", BookController.addAuthor)

router.get("/bookbyChetanBhagat", BookController.bookbyChetanBhagat)

router.get("/updateBookPrice", BookController.updateBookPrice)

router.get("/findBooks", BookController.findBooks)



module.exports = router;