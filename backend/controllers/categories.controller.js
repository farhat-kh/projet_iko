const Category = require("../models/categories.model");
const createError = require("../middlewares/error");

// Créer une catégorie
const createCategory = async (req, res, next) => {
  try {
    const { name, imageUrl } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) return next(createError(400, "Catégorie déjà existante"));

    const category = await Category.create({ name, imageUrl });
    res.status(201).json({ message: "Catégorie créée", category });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Lire toutes les catégories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Lire une catégorie par ID
const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(createError(404, "Catégorie non trouvée"));

    res.status(200).json(category);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Mettre à jour une catégorie
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) return next(createError(404, "Catégorie non trouvée"));

    res.status(200).json({ message: "Catégorie mise à jour", category });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Supprimer une catégorie
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return next(createError(404, "Catégorie non trouvée"));

    res.status(200).json({ message: "Catégorie supprimée" });
  } catch (error) {
    next(createError(500, error.message));
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
