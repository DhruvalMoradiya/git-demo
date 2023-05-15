const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const stickerModel=require("../models/stickerModel")
const userModel = require("../models/userModel")
// const mongoose = require("mongoose");


////////////////////////////*Authentication*//////////////////////////////////////////////////////////////////
const authentication = function (req, res, next) {
    try {
        const token = req.header('x-api-key')
        if (!token) {
            return res.status(401).send({ status: false, message: "Authentication token is required in header" })
        }

        jwt.verify(token, "SECRET-OF-APPHOLIC", function (err, decoded) {
            if (err) {
                return res.status(403).send({ status: false, message: "Invalid authentication token in header" })
            }
            else {
                req.token = decoded;
                next();
            }
        })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const authoization = async function (req, res, next) {
    try {
        let token = req.header('x-api-key')
        let stickerId = req.params.stickerId
        let bodyUserId = req.body.userId
        if (!token) {
            return res.status(401).send({ status: false, message: "Authentication token is required in header" })
        }

        if (stickerId) {
            if (!mongoose.isValidObjectId(stickerId)) {
                return res.status(400).send({ status: false, msg: "Please Enter a valid stickerId" })
            }
        }
        if (bodyUserId) {
            if (!mongoose.isValidObjectId(bodyUserId)) {
                return res.status(400).send({ status: false, msg: "Please Enter a valid UserID" })
            }
        }

        let decodedToken = jwt.verify(token, "SECRET-OF-APPHOLIC")

        let findSticker = await stickerModel.findById(stickerId);
        if (findSticker) {
            if (decodedToken.userId != findSticker.userId) {
                return res.status(403).send({ status: false, msg: "User is not authorized to access this data" });
            }
        }

        if (bodyUserId) {
            if (bodyUserId !== decodedToken.userId) {
                return res.status(403).send({ status: false, msg: "User is not authorized to access this data" });
            }
        }
        next()
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// const authoizationUserDelet = async function(req,res,next){
//     try{
//         let _id=req.params.userId
//         if(!_id) return res.status(400).send({status:false,message:"enter valid user id"})
//         if(_id){
//             if(mongoose.Types.ObjectId.isValid(_id)==false) return res.status(400).send({status:false,message:"invalid id"});
//         }
//         let user= await userModel.findById({_id})
//         if(!user) return res.status(404).send({status:false,message:"user not found"})
       
//         if(req.userId !=_id)
//         return res.status(403).send({status:false,message:"not authorized"})
//         console.log("Autherization successfull ✅")
//         next();
//     }catch(err){
//         return res.status(500).send({ status: false, msg: err.message })

//     }
// }

module.exports = { authentication ,authoization}