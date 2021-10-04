const User = require("../models/users");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { validationResult } = require('express-validator');
const otpGenerator = require("../utils/otpGenerator");
require("dotenv").config();
const authEmail = process.env.user;
const pass = process.env.pass;
const jwtKey = process.env.jwtSecret;

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:authEmail,
      pass,
    },
  });
  
const validations = (req)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = {
            errors: errors.array(),
            status:400
        }
        return err
    }
    else{
        return false
    }
    
}

const getSignedJwtToken = function (payload,secret=jwtKey, expiresIn = 40000) {
    return jwt.sign(payload, secret, {expiresIn});
}  


const emailVerify = async(req,res,next) => {
    const errors = await validations(req)
    if(errors){
        return next(errors)
    }

    const {email} = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return next({status:400, error: { msg: "User already exists" } })
        }


        let OTP = otpGenerator();


    var mailOptions = {
      
        from: authEmail,
        to: `${email}`,
        subject: "confirmation otp",
        text:`To pay 5000 rs to Kartik sharma. Please enter the otp:- ${OTP}`
        
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error)
          return res.status(400).json({msg:"Please enter correct Email Id"})
        } else {
            console.log('Email sent successfully: ');
            const payload = {
                email,OTP
            }
            const token = getSignedJwtToken(payload)
        
            return res.status(200).json( {token});
        }
      });
      
    } 

module.exports = emailVerify;