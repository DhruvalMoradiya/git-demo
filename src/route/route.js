
const express = require("express");
const router = express.Router();

const collegeController = require("../controllers/collegeController");
const internController = require("../controllers/internController.js");



// API'S
router.post('/functionup/colleges',collegeController.createCollege)
router.post('/functionup/interns',internController.createIntern)
router.get('/functionup/collegeDetails',collegeController.getCollegeDetail);


//BAD URL VALIDATION
router.all("*" , (req,res)=>{
    res.status(404).send({ msg:"NOT FOUND THIS URL"})
})

module.exports = router;
