const express = require("express");
const router = express.Router();


// MIDDLEWARES
const verifieToken = require('../middlewares/auth')
const verifieAdmin = require('../middlewares/verifieAdmin')


// CONTROLLERS
const userController = require("../controllers/user.controller");


// ROUTES
router.post("/register", userController.postUser);
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post('/login' , userController.sign );
router.delete("/delete/:id" , verifieToken, verifieAdmin, userController.deleteUser);

// router.get("/verify/:token", userController.verifyEmail);
router.put("/update/:id" , verifieToken,  userController.updateUser);


module.exports = router;