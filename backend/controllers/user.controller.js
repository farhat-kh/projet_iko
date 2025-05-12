const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const createError = require('../middlewares/error');
const crypto = require('crypto');

// model 
const Users = require('../models/user.model');

// nodemailer
const {sendEmail} = require('../services/nodemailer');

// ajouter un utilisateur
const postUser = async (req, res, next) => {
try {
    // Vérifier si l'utilisateur existe déjà
    if (await Users.findOne({ email: req.body.email })) {
        return next(createError(400, "L'utilisateur existe deja"));
    }

    // récupérer les données de l'utilisateur envoyées dans le corps de la requête
    const { nom, prenom, email, password, role = "user" } = req.body;

    // hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // création de l'utilisateur
    const user = await Users.create({
        nom,
        prenom,
        email,
        password: hashedPassword,
        role,
        isVerified: true // ✅ déjà vérifié car pas d'envoi d'email
    });

    res.status(201).json({
        message: "Utilisateur créé avec succès.",
        user: { id: user._id, nom: user.nom, prenom: user.prenom, email: user.email }
    });
    
} catch (error) {
    next(createError(500, error.message));
}
};

// recuperer tous les utilisateurs
const getAllUsers = async (req, res) => {
try {
    const users = await Users.find();
    res.status(200).json(users);
} catch (error) {
    console.log("error", error.message);
}
};

// recuperer un utilisateur
const getUser = async (req, res) => {
try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
} catch (error) {
    console.log("error", error.message);
}
};

// verifier l'authentification
const sign = async (req, res , next) => {
try {
    const user = await Users.findOne({ email: req.body.email });
    if(!user) return next(createError(404, "user not found"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!user.isActive) return next(createError(403, "ce compte est desactive"));
    if(!isPasswordCorrect) return next(createError(403, "wrong password"));

    const token = jwt.sign({ id: user._id, role: user.role }, ENV.TOKEN, { expiresIn: '24h' });
    const {password, ...userWithoutPassword} = user._doc;

    res.cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    res.status(200).json({
        message: "User signed in successfully",
        user: userWithoutPassword
    });

} catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
}
};

// mettre a jour le mot de passe
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ email});
        if (!user) return next(createError(404, "email non trouvé"));

        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        user.resetToken = hashedToken;
        user.resetTokenExpiration = Date.now() + 60 * 60 * 1000; 
        await user.save();

        await sendEmail(user, token);
        res.status(200).json({ message: "Email de réinitialisation envoyé avec succès" });
    } catch (error) {
        return next(createError(500, error.message));
        
    }
}
// réinitialiser le mot de passe
const resetPassword = async (req, res, next) => {
    try {
        const token = req.params.token;
        const {newPassword} = req.body;

        if(!newPassword || newPassword.length < 12) {
            return next(createError(400, "le mot de passe doit contenir au moins 12 caractères"));
        }
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await Users.findOne({
            resetToken: hashedToken,
            resetTokenExpiration: { $gt: Date.now() }
        });
        if (!user) return next(createError(400, "Token invalide ou expiré"));
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
    } catch (error) {
        next(createError(500, error.message));
    }
}


// Désactiver un utilisateur 
const deleteUser = async (req, res, next) => {
    try {
      const user = await Users.findById(req.params.id);
      if (!user) return next(createError(404, "Utilisateur non trouvé"));
  
      
      if (
        req.user.role !== "admin" &&
        req.user.role !== "superadmin" &&
        req.user.id !== user._id.toString()
      ) {
        return next(createError(403, "Accès refusé"));
      }
  
   
      user.isActive = false;
      await user.save();
  
      res.status(200).json({ message: "Compte désactivé avec succès" });
    } catch (error) {
      next(createError(500, error.message));
    }
  };
  
// Déconnecter un utilisateur (supprimer le cookie JWT)
const logoutUser = (req, res) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Utilisateur déconnecté avec succès" });
  };
  
// modifier un utilisateur
const updateUser = async (req, res, next) => {
try {
    if (!req.user || !req.user.id) {
        return next(createError(401, "Authentification requise"));
    }

    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(createError(404, "Utilisateur non trouvé"));
    }

    if (
        req.user.role !== "admin" &&
        req.user.role !== "superadmin" &&
        req.user.id !== user._id.toString()
    ) {
        return next(createError(403, "Accès refusé"));
    }

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json({
        message: "Utilisateur mis à jour avec succès",
        updatedUser,
    });

} catch (error) {
    next(createError(500, error.message));
}
};

module.exports = {
postUser,
getAllUsers,
getUser,
sign,
forgotPassword,
resetPassword,
deleteUser,
logoutUser,
updateUser
};
