const express = require("express");
const router = express.Router();


// MIDDLEWARES
const verifieToken = require('../middlewares/auth')
const verifieAdmin = require('../middlewares/verifieAdmin')

// CONTROLLERS
const categorieController = require("../controllers/categories.controller");

// ROUTES
router.get("/", categorieController.getAllCategories);
router.get("/:id", categorieController.getOneCategory);
router.post("/", verifieToken, verifieAdmin, categorieController.createCategory);
router.put("/:id", verifieToken, verifieAdmin, categorieController.updateCategory);
router.delete("/:id", verifieToken, verifieAdmin, categorieController.deleteCategory);

module.exports = router;