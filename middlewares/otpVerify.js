const jwt = require('jsonwebtoken');
require("dotenv").config()



module.exports = function (req, res, next) {

    const token = req.header('otp-token');
    if (!token) {
        return res.status(400).json({ msg: "No token, authentication denied" });
    }

    try {
        
        const decoded = jwt.verify(token,process.env.jwtSecret);
        // console.log(decoded) 
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'OTP is invalid' });
    }
}