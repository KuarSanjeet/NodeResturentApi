//=======Create Schema For User===========

const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, "User Name Is Required"]
    },
    email:{
        type:String,
        required:[true,"Email Is Required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is Required"]
    },
    address:{
        type:Array
    },
    answer:{
        type:String,
        required:[true, "Answer is Required"]
    }
},{timestamps:true});

module.exports = mongoose.model('Users', authSchema);
