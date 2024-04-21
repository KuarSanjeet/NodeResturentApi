//=======Dependencies================
require("dotenv").config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const resturentRoutes = require('./routes/resturentRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const logMiddleware = require('./middlewares/loggerMiddleware');

//=======Database Connection======== 
connectDB.connectDB();

//=======Middleware=================
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

//=======Routes===================== 
app.use(logMiddleware);
app.use(userRoutes);
app.use(authRoutes);
app.use(resturentRoutes);
app.use(categoryRouter);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data});
})

app.listen(process.env.PORT,()=>{
    console.log(`Node Server Running on ${process.env.PORT}`);
});