const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {login} = require("../controllers/login")


router.post("/login",
    [check("email","Email is required").isEmail(),
check("password","Password is required").not().isEmpty()],
    login
)

module.exports = router