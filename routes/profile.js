const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")
const {fetchProfile,updateProfile} = require("../controllers/profile");

router.get("/profile",auth,fetchProfile)

router.put("/profile",auth,updateProfile)

module.exports = router;