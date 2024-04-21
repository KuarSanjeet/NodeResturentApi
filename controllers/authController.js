//=======Dependencies================
const authModel = require('../models/authModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { logActivity } = require('../utils/logger');
const { sendEmailWithPDF } = require('../utils/sendEmail');
const { generatePDF } = require('../utils/generatePDF');
//=======Register User================
const registerUser = async (req, res) => {
    try {
        const { userName, email, password, address, answer } = req.body;
        //-----Validation------------------
        if (!userName || !email || !password || !answer) {
            return res.status(400).json({
                success: false,
                message: "Please enter required details"
            });
        }
        //-----Check User----------------
        const existing = await authModel.findOne({ email });
        logActivity(`User Data: ${existing}`);
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Email Already Registered. Please Login"
            });
        }
        //-----Hashing user password-----
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        //-----Register User------------
        const newUser = new authModel({ userName, email, password : hashPassword , address, answer });
        await newUser.save();
        // Generate PDF
        const pdfFilePath = generatePDF(req.body);
        // Send email with PDF attachment
        await sendEmailWithPDF(req.body, pdfFilePath);
        return res.status(201).json({ success: true, message: "User registered successfully" });

    }catch(error) {
        //-----Catch Exception---------
        console.error("Error in Registration:", error);
        return res.status(500).send({success:false,message:"Internal Server Error",error:error.message});
    }
};

//=======Login User==================
const loginUser = async (req, res) =>{
    const {email,password} = req.body;
    try{
        //-----Validation-------------------
        if(!email || !password){
            return res.status(400).json({ success: false, message: "Email And Password Are Required" });
        }
        //-----Find User--------------------
        const validate = await authModel.findOne({email});
        logActivity(`User Data: ${validate}`);
        if(!validate){
            return res.status(404).json({ success: false, message: "User Not Found" });
        }
        //-----Validate User Password-------
        is_match = bcrypt.compareSync(password, validate.password);
        if(!is_match){
            return res.status(401).json({ success: true, message: "Invalid Password" });
        }
        //-----Create Token-----------------
        var token = jwt.sign({ id: validate._id }, process.env.JWT_SECRET, {expiresIn : "7D"});
        return res.status(200).json({ success: true, message: "Login Successful", token: token, validate });
    }
    catch(error){
        //-----Catch Exception--------------
        console.error("Error In Login:", error);
        return res.status(500).send({success:false,message:"Internal Server Error",error:error.message});
    }
}
module.exports = { registerUser , loginUser};
