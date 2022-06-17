let axios = require("axios")


let getCityWeather = async function (req, res) {

    try {
        let city = req.query.city
      
        let options = {
            method: 'get',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64e9d2b7d7bcade9c87377913901498c`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data.main.temp
        res.status(200).send({ temp: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getSortCities = async function (req, res) {

    try {
        let allCities =  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArry=[]
        for(i=0;i<allCities.length;i++){
            let obj={city:allCities[i]}
            let resp = await axios.get( `http://api.openweathermap.org/data/2.5/weather?q=${allCities[i]}&appid=64e9d2b7d7bcade9c87377913901498c`)
            console.log(resp.data.main.temp)
            obj.temp = resp.data.main.temp
            cityObjArry.push(obj)
        }
        let sorted = cityObjArry.sort(function(a,b){return a.temp-b.temp})
        console.log(sorted)
        res.status(200).send({ status: true , data:sorted })

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

     
module.exports.getCityWeather = getCityWeather
module.exports.getSortCities = getSortCities