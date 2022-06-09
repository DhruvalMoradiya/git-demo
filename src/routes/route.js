const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publishercontroller= require("../controllers/publishercontroller")

router.post("/createAuthor", authorController.createAuthor  )

router.post("/createBook", bookController.createBook  )

router.post("/createPublisher", publishercontroller.createPublisher  )

router.get("/fetchAllData", bookController.fetchAllData)

router.put('/updateBook',bookController.updateBook)

router.put('/BooksUpdatePrice',bookController.BooksUpdatePrice)

module.exports = router;