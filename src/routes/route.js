const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});
router.get("/missingNumber", function (req, res) {
    let arr= [1,2,3,5,6,7]
 
    let total = 0;
    for (var i in arr) {
        total += arr[i];
    }
  
    let lastDigit= arr.pop()
    let consecutiveSum= lastDigit * (lastDigit+1) / 2
    let missingNumber= consecutiveSum - total
  
    res.send(  { data: missingNumber  }  );
  });
 


router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})
router.get("/missingNumber2", function(req, res){
let arr= [33, 34, 35, 37, 38]
   let len= arr.length
 
   let total = 0;
   for (var i in arr) {
       total += arr[i];
   }
 
   let firstDigit= arr[0]
   let lastDigit= arr.pop()
   let consecutiveSum= (len + 1) * (firstDigit+ lastDigit ) / 2
   let missingNumber= consecutiveSum - total
  
   res.send(  { data: missingNumber  }  );
});

router.get('/candidates/:canidatesName', function(req, res){
   
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})

router.get("/movies", function(req, res){
    let movies = ["Rang de basanti","The shining","Lord of the rings","Batman begins"]
    res.send(  { movies }  );
});


router.get("/movies/:indexNumber", function(req, res){
    let movies = ["Rang de basanti","The shining","Lord of the rings","Batman begins"]
  let i =req.params.indexNumber
let findeMovie;
if ((i - 1)<movies.length){
    findeMovie=movies[i - 1]
}else{
    findeMovie="use a valid index " + movies.length
}
  

    res.send(findeMovie );
});

  const mArr =  [ {
        id: 1,
        name: "The Shining"
       }, {
        id: 2,
        name: "Incendies"
       }, {
        id: 3,
        name: "Rang de Basanti"
       }, {
        id: 4,
        name: "Finding Nemo"
       }]
       router.get("/films/", function(req, res){     

    res.send( mArr);
});


router.get("/films/:filmId", function(req, res){     

    let i = req.params.filmId
    let findFilm;
    if ((i -1)<mArr.length){
        findFilm=mArr[i-1]
    }else{
        findFilm="No movie exists with this id"+i
    }
    res.send( findFilm);
});

    
module.exports = router;
// adding this comment for no reason