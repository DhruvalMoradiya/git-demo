const userModel = require("../models/userModel")
const mongoose = require('mongoose')
// const emailVerifier = require('email-verifier');
const jwt = require("jsonwebtoken");
const  {sendEmail}  = require("../aws/ses")
const isvalidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValid = function(x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
};
const isValidBody = function(x) {
    return Object.keys(x).length > 0;
};


const createUser = async function (req, res) {
    try {
        let body= req.body
        let {fristName, lastName, email, password} = body
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        body.otp =randomNumber
        if(!isValidBody(body)) return res.status(400).send({status: false, message: "Body cannot be blank"})
        //fname validation and fname regex
        if (!isValid(fristName)) return res.status(400).send({ status: false, message: "First Name is required" })
        if (!/^[a-zA-Z\s]+$/.test(fristName)) return res.status(400).send({ status: false, message: "First Name should be albhabets" })
        //lname validation and lname regex
        if (!isValid(lastName)) return res.status(400).send({ status: false, message: "Last Name is required" })
      if (!/^[a-zA-Z\s]+$/.test(lastName)) return res.status(400).send({ status: false, message: "Last Name should be albhabets" })
        //email valid and eamil regex
        if (!isValid(email)) return res.status(400).send({ status: false, message: "email is required" })
        if (!/^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/.test(email)) return res.status(400).send({ status: false, message: "valid email is required" })    
        
        


        //password vallid and password regex
        if(!isValid(password)) return res.status(400).send({ status: false, message: "Password is required" })
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/.test(password)) return res.status(400).send({status: false,message: "Please provide a valid password ,Password should be of 8 - 15 characters",})


        let userDetails = await userModel.findOne({ $or: [ { email: email }] })
        

        if (userDetails) {
          if (userDetails.email == email) {
              return res.status(400).send({ status: false, message: `${email} email already exist` })
            }
        }

        // const UserEmailVerifyUrl = await sendEmail.UserEmailVerifyUrl(user.email,randomNumber);


        let usersData= await userModel.create(body)
        await sendEmail(usersData.email,usersData.otp)
        return res.status(201).send({status:true,message:"User created successfully",usersData})
    } catch (error) {
        return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
    }
}



  

const userLogin = async function (req, res) {
    try {
        const credentials = req.body;
        if (!isValidBody(credentials)) {
            return res.status(400).send({ status: false, message: "Please provide login credentials" });
        }

        const { email, password } = credentials;
        //Email validation
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is required" })
        }
        if (!(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/).test(email)) {
            return res.status(400).send({ status: false, message: "Please provide valid Email Id" });
        }

        //Password Validation
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }

        //user present or not
        let logIn = await userModel.findOne({email, password });
        if (!logIn) {
            return res.status(400).send({ status: false, message: "Email and password is not correct" });
        }
        let isDeletedChek=await userModel.findOne({ isDeleted: false });
        if (!isDeletedChek) {
            return res.status(400).send({ status: false, message: "Account allredy Deleted" });
        }
        const token = jwt.sign(
            {
                userId: logIn._id.toString(),
            },
            "SECRET-OF-APPHOLIC", {
            // expiresIn: "60min"
        }
        );
        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, message: "You are logged in", data: { token } });
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

const getUserId = async function (req, res) {
    try {
        let userId = req.params.userId

        if (!isvalidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "please enter valid userId" })
        }

        let userDetails = await userModel.findOne({ _id: userId})

        if (!userDetails) {
            return res.status(404).send({ status: false, message: "No user found" })
        }

        const userDetailsFinal = {fristName: userDetails.fristName, lastName: userDetails.lastName, email: userDetails.email }

        return res.status(200).send(userDetailsFinal )
    }
    catch (err) {

        return res.status(500).send({ status: false, msg: err.message })
    }
};


const deleteAccount = async function (req, res) {
    try {
        let user = req.params.userId;

        let users = await userModel.findOne({ _id: user, isDeleted: false })
        if (!users) { return res.status(404).send({ status: false, message: "user does not exist" }) }

        await userModel.updateMany({ _id: user, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } })

        return res.status(200).send({ status: true, message: "Account deleted successfully" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const updateUserProfile = async function (req, res) {
    try {
      let body = req.body
      let user = req.params.userId
      
     // if (!isValidBody(body)) return res.status(400).send({ status: false, message: "Body is empty to update " })
       if (!isValidBody(body) && !req.files) return res.status(400).send({ status: false, message: "Body is empty to update " })
  
  
      let { fristName, lastName, email, password} = body
  
  
      
      if ("fristName" in body) {
        if (!isValid(fristName)) return res.status(400).send({ status: false, message: "Enter a valid fristName" })
        if (!/^[a-zA-Z\s]+$/.test(fristName)) return res.status(400).send({ status: false, message: "Enter fristName in alphabetical format" })
      }
  
      if ("lastName" in body) {
        if (!isValid(lastName)) return res.status(400).send({ status: false, message: "Enter a valid lastName" })
        if (!/^[a-zA-Z\s]+$/.test(lastName)) return res.status(400).send({ status: false, message: "Enter lastName in alphabetical format" })
      }
  
  
      let unique= []
      if ("email" in body) {
        if (!isValid(email)) return res.status(400).send({ status: false, message: "Enter a valid email id" })
        if (!/^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/.test(email)) return res.status(400).send({ status: false, message: "Enter email in correct format" })
        unique.push({ email: email })
      }
  
      if(unique.length>0){
      let userDetails = await userModel.findOne({ $or: unique })
  
      if (userDetails) {
        if (userDetails.email == email) {
          return res.status(400).send({ status: false, message: `${email} email  already exist` })
        } 
      }
    }
  
      if ("password" in body) {
        if (!isValid(body.password)) return res.status(400).send({ status: false, message: "Enter a valid password" })
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/.test(body.password)) return res.status(400).send({ status: false, message: "password should contain in 8 - 15 characters/special/numbers" })
      }
     
      let result = { fristName, lastName, email, password }
   
  
      let update = await userModel.findOneAndUpdate({ _id:user }, result, { new: true })
  
      return res.status(200).send({ status: true, message: " User profile Updated successfully", data: update })
  
    } catch (err) {
      console.log(err)
      return res.status(500).send({ status: false, message: "server side errors", error: err.message })
    }
  }


  const forgotPasswordOtpSend = async (req, res) => {
    let body= req.body
    const { email} = body;
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    body.otp =randomNumber
    // Find user with matching email
    const user = await userModel.findOne({ email });
  
    if (!user) {
      return res.status(404).send('No account with that email address exists');
    }
    await sendEmail(body.email ,body.otp)
    let otp=body.otp
    
    res.status(200).send({  message: "your forgotPassword otp has been send",otp})
}


 
const forgotPasswordThenChengePassword = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const confirmPassword=req.body.confirmPassword

        const data = await userModel.findOne({email:email })

        if (data) {
            const newPassword = (password);
            if(password!=confirmPassword){
                res.status(200).send({ success: true, msg: "your password and confirmPassword has been not same"})
            }else{

             await userModel.findOneAndUpdate({email: email}, { $set: { password: newPassword } }, { new: true });
            res.status(200).send({ success: true, msg: "your password has been updated" })
        }}
        else {
            res.status(404).send({ success: false, msg: "user id not found" })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}
   
    
module.exports = { createUser, userLogin, getUserId,deleteAccount,updateUserProfile,forgotPasswordOtpSend,forgotPasswordThenChengePassword}