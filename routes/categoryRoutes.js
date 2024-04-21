//=======Dependencies============
const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryControllers");

//=======Auth Router=============
router.post('/createCategory',authMiddleware, categoryController.createCategory);

module.exports = router;