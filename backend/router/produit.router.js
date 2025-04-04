const express = require("express");
const upload = require("../services/multer.cjs");
const {postProduit, getAllProduits, getProduit, updateProduit, deleteProduit} = require("../controllers/produit.controller");
const verifieToken = require('../middlewares/auth')

const router = express.Router();

// Route pour ajouter un produit avec une image
router.post("/add", upload.single("image"), postProduit);

const produitController = require("../controllers/produit.controller");


router.get("/all", produitController.getAllProduits);
router.get("/:id", produitController.getProduit);
router.delete("/delete/:id" , verifieToken, produitController.deleteProduit);
router.put("/update/:id" , verifieToken, upload.single("image"), produitController.updateProduit);


module.exports = router;