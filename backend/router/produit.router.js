// produit.router.js
const express = require("express");
const router = express.Router();
const produitController = require("../controllers/produit.controller");
const verifieToken = require("../middlewares/auth");
const verifieAdmin = require("../middlewares/verifieAdmin");

// Routes CRUD pour produits
router.post("/", verifieToken, verifieAdmin, produitController.addProduit);
router.get("/", produitController.getProduits);
router.get("/:id", produitController.getProduitById);
router.put("/:id", verifieToken, verifieAdmin, produitController.updateProduit);
router.delete("/:id", verifieToken, verifieAdmin, produitController.deleteProduit);

module.exports = router;

