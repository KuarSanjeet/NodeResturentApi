//=======Dependencies============
const express = require('express');
const router = express.Router();
const resturentController = require('../controllers/resturentController');
const authMiddleware = require("../middlewares/authMiddleware");

//=======Router=============
router.post('/createResturent', authMiddleware, resturentController.createResturent);
router.get('/getResturent',authMiddleware,resturentController.getResturent);

module.exports = router; 