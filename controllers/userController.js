//=======Dependencies================
const authModel = require('../models/authModel');
const tokenBlacklist = require('../utils/tokenBlacklist');
var bcrypt = require('bcryptjs');

//=======Get User Data===============
const getUserData = async (req,res)=>{
    try{
        //-------Get User Data By Id---------
        const userData = await authModel.findById({ _id:req.body.id });
        if(!userData){
            return res.status(404).send({success: false, message:"User Doesn't Exist"});
        }
        res.status(200).send({success:true, message:"Get User Data",userData:userData}); 
    }catch(error){
        //-------Get User Error-------------
        console.log("Error in getUserData");
        return res.status(500).send({success: false, message: "Error in GetUserData", error: error.message});
    }
}

//=======Update User Data===============
const updateUserData = async (req,res)=>{
    try {
        //-------Find Data By Id------------
        const updateUserData = req.body;
        const userData = await authModel.findById({ _id:req.body.id });
        if(!userData){
            return res.status(404).send({success: false, message:"User Doesn't Exist"});
        }
        //-------Update Data----------------
        userData.set(updateUserData);
        const updatedUserData = await userData.save();
        return res.status(200).send({success:true,message:"Update User Data", updatedUserData:updatedUserData});

    }catch(error){
        //-------Update User Data Error-----
        console.log("Error in updateUserData");
        return res.status(500).send({success: false, message: "Error in updateUserData", error: error.message});
    }
}

//=======Update User Password===========
const updatePassword = async (req,res)=>{
    try {
        if(!req.body.answer){
            return res.status(400).send({success:false, message:"Answer is required"});
        }
        const userData = await authModel.findById({ _id:req.body.id });
        if(!userData){
            return res.status(404).send({success:false, message:"User Not Found"});
        }
        if(userData.answer!=req.body.answer){
            return res.status(400).send({success:false, message:"Please enter correct answer"});
        }
        //-------Encrypt and save user password----
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.newPassword, salt);
        userData.password = hashPassword;
        const UpdatedUserData = await userData.save();
        return res.status(200).send({success:true,message:"User Password Updated!"});
    } catch (error) {
        // -------Update User Data Error-----
        console.log("Error in updatePassword");
        return res.status(500).send({success: false, message: "Error in updatePassword", error: error.message});
    }
}

//=======Delete User===========
const deleteUser = async (req,res)=>{
    try {
        //-------Find user by id-------
        const userData =  await authModel.findById(req.body.id);
        if(!userData){
            return res.status(404).send({success:false, message:"User Not Found"});
        }
        //-----Delete user by id------
        const userDeleted = await authModel.findByIdAndDelete(req.body.id);
        return res.status(200).send({success:true, message:"User Deleted Successfully",userName:userData.userName});  
    } catch (error) {
        // -------Update User Data Error-----
        console.log("Error in DeleteUser");
        return res.status(500).send({success: false, message: "Error in DeleteUser", error: error.message});
    }
}

//=======Logout User===========
const logOut = async (req,res)=>{
    try {        
        const token = req.headers['authorization']?.split(' ')[1];
        if (token) {
            tokenBlacklist.add(token);
        }
        return res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        // -------Logout User  Error-----
        console.log("Error in Logout");
        return res.status(500).send({success: false, message: "Error in Logout", error: error.message});
    }
}

module.exports = {getUserData, updateUserData, updatePassword, deleteUser, logOut}