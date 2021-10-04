const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name :{
        type:String,
        required :true
    },
    password : {
        type : String,
        required:true
    },
    email : {
        type: String,
        required:true
    },
    profilePicUrl : {
        type : String,
        
    }
})

const user = mongoose.model("user",User);

module.exports = user;
