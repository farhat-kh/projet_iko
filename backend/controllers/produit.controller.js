const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const createError = require('../middlewares/error');

// Models
const Produit = require('../models/produit.model');
const Categorie = require('../models/categorie.model');

// ✅ Ajouter un produit
const postProduit = async (req, res) => {
    try {
        const { nom, description, prix, categorie } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Récupération du chemin de l'image

        const produit = new Produit({
            nom,
            description,
            prix,
            categorie,
            image: imageUrl
        });

        await produit.save();
        res.status(201).json({ message: "Produit ajouté avec succès", produit });

    } catch (error) {
        console.error("Erreur:", error.message);
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

// ✅ Récupérer tous les produits avec leurs catégories associées
const getAllProduits = async (req, res) => {
    try {
        const produits = await Produit.find().populate("categorie", "nom"); // Récupérer le nom de la catégorie
        res.status(200).json(produits);
    } catch (error) {
        console.error("Erreur:", error.message);
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

// ✅ Récupérer un seul produit par ID avec sa catégorie associée
const getProduit = async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id).populate("categorie", "nom");

        if (!produit) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        res.status(201).json(produit);
    } catch (error) {
        console.error("Erreur:", error.message);
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

// ✅ Modifier un produit
const updateProduit = async (req, res) => {
    try {
        const { nom, description, prix, categorie } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image; 

        const produit = await Produit.findByIdAndUpdate(
            req.params.id,
            { nom, description, prix, categorie, image: imageUrl },
            { new: true }
        );

        if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

        res.status(200).json({ message: "Produit mis à jour", produit });

    } catch (error) {
        console.error("Erreur:", error.message);
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

// ✅ Supprimer un produit
const deleteProduit = async (req, res) => {
    try {
        const produit = await Produit.findByIdAndDelete(req.params.id);

        if (!produit) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        res.status(200).json({
            message: "Produit supprimé avec succès",
            produit
        });
    } catch (error) {
        console.error("Erreur:", error.message);
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

module.exports = {
    postProduit,
    getAllProduits,
    getProduit,
    updateProduit,
    deleteProduit
};
