const express = require("express");
const router = express.Router();


// MIDDLEWARES
const verifieToken = require('../middlewares/auth')
const verifieAdmin = require('../middlewares/verifieAdmin')


// CONTROLLERS
const userController = require("../controllers/user.controller");


// ROUTES
router.post("/add", userController.postUser);
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post('/sign' , userController.sign );
router.delete("/delete/:id" , verifieToken, verifieAdmin, userController.deleteUser);
router.put("/update/:id" , verifieToken,  userController.updateUser);


module.exports = router;