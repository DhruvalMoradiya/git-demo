const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherController= require("../controllers/weatherController")
const MemeController= require("../controllers/memeController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

router.get("/cowin/findByDistrict", CowinController.findByDistrict)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

//2 assignment
router.get("/weather/city", WeatherController.getCityWeather)
router.get("/getSortedCities", WeatherController.getSortCities)


//3 assignment

router.get("/getAllMemes", MemeController.getAllMemes)
router.post("/createMemes", MemeController.createMemes)
module.exports = router;