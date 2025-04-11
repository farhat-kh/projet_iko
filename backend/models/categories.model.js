const express = require('express');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const categorieSchema = new Schema({
    imageUrl: {
        type: String,
        required: false
    },
    name:{
        type: String,
        unique: true,
        required: true,
        enum: ["tables", "assises", "lits", "rangements", "canapes", "buffets"],
        trim: true
    },

    dateAjout: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Categories', categorieSchema);