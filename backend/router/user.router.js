const express = require("express");
const router = express.Router();



const verifieToken = require('../middlewares/auth')
const verifieAdmin = require('../middlewares/verifieAdmin')

const userController = require("../controllers/user.controller");

router.post("/add", userController.postUser);
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post('/sign' , userController.sign );
router.delete("/delete/:id" , verifieToken, verifieAdmin, userController.deleteUser);
router.put("/update/:id" , verifieToken, userController.updateUser);


module.exports = router;