const express = require('express');
const router = express.Router();
const UserModel= require("../models/bookModel.js")
const UserController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/userBook", UserController.userBook  )

router.get("/getBooksData", UserController.getBookData)

module.exports = router;