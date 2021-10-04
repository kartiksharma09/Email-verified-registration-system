const User = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require("dotenv").config();
const jwtKey = process.env.jwtSecret;
const { validationResult } = require('express-validator');


const validations = (req)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = {
            error: errors.array(),
            status:400
        }
        return err
    }
    else{
        return false
    }
    
}

const getSignedJwtToken = function (payload,secret = jwtKey, expiresIn = 40000) {
    return jwt.sign(payload, secret, {expiresIn});
}  
const createUser = async (req, res, next) => {
    // console.log("hello")
    const errors = await validations(req)
    console.log(errors,"errors")
    if(errors){
        return next(errors)
    }
    console.log(req.user.email)

    const { name, email, password,otp} = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return next({status:400, error: { msg: "User already exists" } })
        }
        console.log(email!== req.user.email && otp!==req.user.OTP,req.user.OTP,typeof(req.user.OTP))
        const OTP = Number(req.user.OTP)
        if (email!== req.user.email && otp!==OTP){
            return next({status:401, error:{msg:"Invalid OTP"}})
        }

        user = new User({
            name,
            email,
            password
        })



        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        const token = getSignedJwtToken(payload)
        

        res.status(200).json( {token});
};
module.exports = { createUser };