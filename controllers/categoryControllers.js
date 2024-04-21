const categoryModel = require('../models/categoryModel');

const createCategory = async (req,res)=>{
    try {
        const {title,imageUrl} =req.body;
        if(!title){
            return res.status(400).send({success:false,message:"Pleae enter required details"});
        }
        const categoryData = await categoryModel.find({title});
        if(categoryData.length!==0){
            return res.status(401).send({success:false,message:"Duplicate Category"});
        }
        const newcategoryData = new categoryModel({title,imageUrl});
        newcategoryData.save();
        return res.status(201).send({success:true, message:"Category Created",categoryData:newcategoryData});    
    } catch (error) {
        console.log("Error in CreateCategory");
        return res.status(500).send({success:false,message:"Error in CreateCategory",error:error.message});
    }
}

module.exports = {createCategory};