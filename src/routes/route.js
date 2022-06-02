const express = require('express');
const externalModule = require('../logger/logger.js')
const externalDate = require('../util/helper.js')
const externalhelper = require('../util/helper.js')
const externalvalidator=require('../validator/formatter')
const router = express.Router();
const lodash = require('lodash')

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


router.get('/hello', function (req, res) {
    let month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    let subArray = lodash.chunk(month, 4)
    console.log(subArray)
    res.send('My second api!')

    
    let oddNumber = [1,3,5,7,9,11,13,15,17,19]
    console.log(lodash.tail(oddNumber))

    
    let a =[1,4,5,6]
    let b =[2,5,2,9]
    let c =[3,2,6,7,8]
    let d =[5,5,5]
    let e =[1,2,3,4,5,6,7,8,9,10]
        console.log(lodash.union(a,b,c,d,e))

        let keyValue=[["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
               console.log(lodash.fromPairs(keyValue))
});



module.exports = router;
// adding this comment for no reason