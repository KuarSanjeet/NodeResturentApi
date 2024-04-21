//=======Database Connection============
const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONOGO_URL);
        console.log(`Connected To DB ${mongoose.connection.host}`);
    }catch(error){
        console.log("DB Connection Error".error);
    }
}
exports.connectDB = connectDB