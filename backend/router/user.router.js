const express = require("express");
const router = express.Router();


// MIDDLEWARES
const verifieToken = require('../middlewares/auth')
const verifieAdmin = require('../middlewares/verifieAdmin')


// CONTROLLERS
const userController = require("../controllers/user.controller");


// ROUTES
router.post("/register", userController.postUser);
router.post('/login' , userController.sign );
router.put("/update-password/:id", verifieToken, userController.updatePassword);
router.put("/forgot-password", userController.forgotPassword);
router.put("/reset-password/:token", userController.resetPassword);
router.get("/logout", verifieToken, userController.logoutUser);
router.get("/verify-email/:token", userController.verifyEmail);
router.get("/all", verifieAdmin, userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/update/:id" , verifieToken,  userController.updateUser);
router.delete("/delete/:id" , verifieToken, userController.deleteUser);


module.exports = router;