const User = require("../models/users");


const fetchProfile = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }}

const updateProfile = async(req,res,next)=>{
        const {
            name,profilePicUrl
        } = req.body;

        const newProfile = {};

        if (name) newProfile.name = name;
        if (profilePicUrl) newProfile.profilePicUrl = profilePicUrl;

        try {
            let profile = await User.findOne({ user: req.user.id });
                
                profile = await User.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: newProfile },
                    { new: true }
                ).select("-password");
            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }

module.exports = {fetchProfile,updateProfile};