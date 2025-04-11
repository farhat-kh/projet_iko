const express = require("express");
const router = express.Router();

// Import du middleware d'authentification
const verifieToken = require("../middlewares/auth");
const verifieAdmin = require("../middlewares/verifieAdmin");
// Import du controller
const categoriesController = require("../controllers/categories.controller");

// Routes CRUD
// route public
router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getCategory);
// route admin
router.post("/", verifieToken, verifieAdmin, categoriesController.createCategory);

router.put("/:id", verifieToken, verifieAdmin, categoriesController.updateCategory);

router.delete("/:id", verifieToken, verifieAdmin, categoriesController.deleteCategory);

module.exports = router;
