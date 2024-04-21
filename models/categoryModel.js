const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    imageUrl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimilarpng.com%2Fgood-food-logo-design-on-transparent-background-png%2F&psig=AOvVaw04fKyLt_BSB7sw8ncHW-Sp&ust=1713528909914000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCB3uHey4UDFQAAAAAdAAAAABAK"
    }
},{timestamps:true});

module.exports = mongoose.model("Categories",categorySchema);