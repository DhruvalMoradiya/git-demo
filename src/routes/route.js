const express = require('express');
const externalModule = require('../logger/logger.js')
const externalDate = require('../util/helper.js')
const externalhelper = require('../util/helper.js')
const externalvalidator=require('../validator/formatter')

const router = express.Router();

router.get('/test-me', function (req, res) {
    externalModule.welcome()
    externalDate.printDate()
    externalDate.printMonth()
    externalDate.printBatch()
    externalvalidator.trim()
    externalvalidator.upperCase()
    externalvalidator.lowerCase()
    res.s
    
    res.send('My frist ever api!')
    
});


router.get('/test-me2', function (req, res) {
    res.send('My third api!')
});

router.get('/test-me3', function (req, res) {
    res.send('My 4th api!')
});

router.get('/test-me4', function (req, res) {
    res.send('My last api!')
});

module.exports = router;
// adding this comment for no reason