const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const emailVerify = require("../controllers/emailVerify");
const otpVerify = require("../middlewares/otpVerify");
const {createUser} = require("../controllers/register");

router.post("/verify",
    [check("email","Email is required").isEmail()],
    emailVerify
)

router.post("/register",otpVerify,[check("name","Name is required").not().isEmpty(),
check("email","Email is required").isEmail().not().isEmpty(),
check("password","Password is required").not().isEmpty(),
check("otp","Otp is required").isNumeric().isLength(4)
    ],
    createUser)


module.exports = router;