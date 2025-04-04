const express = require('express');
const router = express.Router();


const verifieToken = require('../middlewares/auth')

const adminController = require("../controllers/admin.controller");

router.post("/add", adminController.postAdmin);
router.get("/all", adminController.getAllAdmins);
router.get("/:id", adminController.getAdmin);
router.delete("/delete/:id" , verifieToken, adminController.deleteAdmin);
router.put("/update/:id" , verifieToken, adminController.updateAdmin);





module.exports = router;