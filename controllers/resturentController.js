//=======Dependencies==========
const resturentModel = require('../models/resturentModel');

//=======Create Resturent
const createResturent = async (req,res)=>{
    try {
        const {title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords} = req.body;
        if(!title || !code){
            return res.status(400).send({success:true,message:"Please enter required details"});
        }
        const resturentDetails = await resturentModel.findOne({code:code});
        if(resturentDetails){
            return res.status(403).send({success:false,message:"Resturent Already Exist"});
        }
        const resturentData = new resturentModel({title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords});
        resturentData.save();
        return res.status(200).send({success:true, message:"Resturent Created",Data:resturentData});
    } catch (error) {
        console.log("Error in CreateResturent");
        return res.status(500).send({success:false,message:"Error in CreateResturent",error:error.message});
    }
}

const getResturent = async (req,res) =>{
    try {       
        const {code} = req.query;
        let resturentData;
        if(code){
            resturentData = await resturentModel.find({code});
            if (resturentData.length === 0) {
                return res.status(404).send({success: false,message: "No restaurant found with the provided code"});
            }
        }else{
            resturentData = await resturentModel.find();
        }
        return res.status(200).send({success:true,message:"Resturent Details",resturentCount: resturentData.length, resturentData:resturentData});
    } catch (error) {
        console.log("Error in getResturent");
        return res.status(500).send({success:false,message:"Error in getResturent",error:error.message});
    }
}

module.exports = {createResturent, getResturent}; 