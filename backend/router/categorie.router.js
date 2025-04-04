const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorie.controller');
const upload = require("../services/multer.cjs");

const verifieToken = require('../middlewares/auth')

router.post("/add", upload.single("image"), categorieController.postCategorie);
router.get("/all", categorieController.getAllCategories);
router.get("/:id", categorieController.getCategorie);
router.delete("/delete/:id" ,verifieToken, categorieController.deleteCategorie);
router.put("/update/:id" , categorieController.updateCategorie);

module.exports = router;