const express = require('express');
const router = express.Router();
const {authentication,authoization,authoizationUserDelet}= require('../middleware/auth')
const { addSticker,getSticker,deleteSticker} = require("../controllers/stickerController")
const { addCollection,getCollection} = require("../controllers/collectionController")
const { createUser,userLogin,getUserId,deleteAccount,forgotPasswordOtpSend,forgotPasswordThenChengePassword} = require("../controllers/userController")



router.post("/sticker", addSticker)
router.get("/stickers", getSticker)
router.delete("/stickers/:stickerId",authentication,authoization,deleteSticker)

router.post("/collection", addCollection)
router.get("/collections", getCollection)

router.post("/register", createUser)
router.post("/login", userLogin)
router.get("/user/:userId",authentication,getUserId)
router.delete("/user/:userId",authentication,deleteAccount)
router.post("/forgotpasswor",forgotPasswordOtpSend)
router.put("/chengepassword",forgotPasswordThenChengePassword)


module.exports = router;