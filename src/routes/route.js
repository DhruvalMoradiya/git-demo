const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

router.get("/tes-api" , function (req,res){
    res.send("hey")
})

router.get("/tes-api2" , function (req,res){
    res.send("Hello")
})

module.exports = router;