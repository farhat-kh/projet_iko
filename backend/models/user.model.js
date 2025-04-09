const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 12,
        required: true
    },
    
    role: {
        type: String,
        enum: ['user', 'admin','superadmin'],
        // default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: {
        createdAt: true
    }
});

module.exports = mongoose.model('User', userSchema);