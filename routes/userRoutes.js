//=======Dependencies============
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtMiddleware =require("../middlewares/authMiddleware");

//=======Router=============
router.get('/getUserData',jwtMiddleware, userController.getUserData);
router.put('/updateUserData', jwtMiddleware, userController.updateUserData);
router.post('/updatePassword', jwtMiddleware, userController.updatePassword);
router.delete('/deleteUser', jwtMiddleware, userController.deleteUser);
router.post('/logout', jwtMiddleware, userController.logOut);

module.exports = router;
