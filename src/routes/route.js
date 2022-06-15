const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mid = require('../middleware/auth')



router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",mid.authMid,mid.authorization, userController.getUserData)

router.put("/users/:userId",mid.authMid,mid.authorization, userController.updateUser)

router.delete("/users/:userId",mid.authMid,mid.authorization, userController.deleteData)

module.exports = router;