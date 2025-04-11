// produit.controller.js
const Produit = require("../models/produit.model");
const createError = require("../middlewares/error");

// Ajouter un produit
const addProduit = async (req, res, next) => {
  try {
    const newProduit = new Produit(req.body);
    const saved = await newProduit.save();
    res.status(201).json({ message: "Produit ajouté", produit: saved });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Récupérer tous les produits
const getProduits = async (req, res, next) => {
  try {
    const produits = await Produit.find().populate("categories");
    res.status(200).json(produits);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Récupérer un produit par ID
const getProduitById = async (req, res, next) => {
  try {
    const produit = await Produit.findById(req.params.id).populate("categories");
    if (!produit) return next(createError(404, "Produit non trouvé"));
    res.status(200).json(produit);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Mettre à jour un produit
const updateProduit = async (req, res, next) => {
  try {
    const updated = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return next(createError(404, "Produit non trouvé"));
    res.status(200).json({ message: "Produit modifié", produit: updated });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Supprimer un produit
const deleteProduit = async (req, res, next) => {
  try {
    const deleted = await Produit.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "Produit non trouvé"));
    res.status(200).json({ message: "Produit supprimé" });
  } catch (error) {
    next(createError(500, error.message));
  }
};

module.exports = {
  addProduit,
  getProduits,
  getProduitById,
  updateProduit,
  deleteProduit
};
