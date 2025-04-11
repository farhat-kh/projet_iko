const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  quantite: {
    type: Number,
    required: true,
    min: 1
  },
  imageUrl: {
    type: String,
    required: false
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories', // doit correspondre au nom du modèle
    required: true
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model("Produit", produitSchema);
