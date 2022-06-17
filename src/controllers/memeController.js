const axios = require('axios');

const getAllMemes = async (req, res) => {
    let options ={
      method: 'get',
      url: `https://api.imgflip.com/get_memes`
    }
  
    let response = await axios(options);
  
    res.status(200).send({status: true, data: response.data})
  }

  let createMemes = async function (req, res) {
    try{

  
    let options ={
      method: 'post',
      url: `https://api.imgflip.com/caption_image?template_id=181913649&text0=dhruval&text1=functionup&username=chewie12345&password=meme@123`
    }
  
    let result = await axios(options);
    res.send({data:result.data})
  
}
catch (err) {
    console.log(err)
    res.status(500).send({ status:false , msg: "server error"})
}
  }

  
module.exports.getAllMemes = getAllMemes;
module.exports.createMemes = createMemes;