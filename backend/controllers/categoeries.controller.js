const ENV = require('../config/env');
const createError = require('../middlewares/error');
const Categories = require('../models/categories.model');
const Products = require('../models/products.model');
const fs = require('fs');
const path = require('path');


const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Categories.find();
        res.status(200).json(categories);
    } catch (error) {
        next(createError(400, error.message));
    }
};

const getOneCategory = async (req, res, next) => {
    try {
        const category = await Categories.findById(req.params.id);
        if (!category) {
            return next(createError(404, 'Category not found'));
        }
        res.status(200).json(category);
    } catch (error) {
        next(createError(500, error.message));
    }
};

const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const image = req.file ? `${ENV.NOM_DOMAIN}/uploads/${req.file.filename}` : null;

        const newCategory = new Categories({
            name,
            image
        });

        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        next(createError(400, error.message));
    }
};


const updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const categoryId = req.params.id;

        const category = await Categories.findById(categoryId);
        if (!category) {
            return next(createError(404, 'Category not found'));
        }

        if (req.file) {
            // Supprimer l'ancienne image si elle existe
            if (category.image) {
                const oldImagePath = path.join(__dirname, '../uploads', category.image.split('/').pop());
                fs.unlinkSync(oldImagePath);
            }
            category.image = `${ENV.NOM_DOMAIN}/uploads/${req.file.filename}`;
        }

        category.name = name || category.name;

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        next(createError(400, error.message));
    }
};


const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await Categories.findById(categoryId);
        if (!category) {
            return next(createError(404, 'Category not found'));
        }

        // Supprimer l'image de la catégorie
        if (category.image) {
            const imagePath = path.join(__dirname, '../uploads', category.image.split('/').pop());
            fs.unlinkSync(imagePath);
        }

        // Supprimer tous les produits associés à cette catégorie
        await Products.deleteMany({ category: categoryId });

        await Categories.findByIdAndDelete(categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        next(createError(400, error.message));
    }
};

module.exports = {
    getAllCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
};