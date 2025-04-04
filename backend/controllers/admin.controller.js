const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const createError = require('../middlewares/error');
// const sendEmail = require("../services/nodemailer");

// model 
const Admins= require('../models/admin.model');





// ajouter un admin
const postAdmin = async (req, res, next) => {
    try {
        // recupere les donnees de l'utilisateur envoyees dans le corps de la requete
        const { nom, prenom, email, password } = req.body;

        // hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);


        // on enovie un email a notre nouvel utilisateur avec le lien de verification
        // await sendEmail(user, token)

        // creation de l'utilisateur
        const admin = await Admins.create({
            nom,
            prenom,
            email,
            password: hashedPassword
        });

        // Cree un jeton JWT
        const token = jwt.sign({ id: admin._id }, ENV.TOKEN, { expiresIn: '24h' });


        res.status(201).json({
            message: "Admin created successfully",
            admin
        })
    } catch (error) {
        console.log("error", error.message);
    }
}
// verifier l'authentification
const verifyEmail = async (req, res , next) => {
    try {
        const token = req.params.token;
        // on verifie si le token est valide
        const userDecodedToken = jwt.verify(token, ENV.TOKEN);
        if(!userDecodedToken) return next(createError(403,"token non valide"));

        // on verifie si l'utilisateur a deja ete verifie
        await Admins.findOneAndUpdate(
            userDecodedToken.id,{isVerified: true}, {new: true});
        res.status(200).json({
            message: "User verified !! "
        })
    } catch (error) {
        console.log("error", error.message);
        
    }
}




// recuperer tous les admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admins.find();
        res.status(200).json(admins);
    } catch (error) {
        console.log("error", error.message);
    }
}


// recuperer un admin
const getAdmin = async (req, res) => {
    try {
        const admin = await Admins.findById(req.params.id);
        res.status(200).json(admin);
    } catch (error) {
        console.log("error", error.message);
    }
}





// sign un admin
const sign = async (req, res , next) => {
    try {
        // recherche l'utilisateur dans la base de données par son mail
        const admin = await Admins.findOne({ email: req.body.email });
        // si l'utilisateur n'existe pas , renvoie une erreur 404
        if(!admin) return next(createError(404, "admin not found"));
        // verifie si admin a confirmer son email
        if(!admin.isVerified) return next(createError(403, "admin not verified"));
        // verifie si le mot de passe est correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password);
        // si le mot de passe est incorrect, renvoie une erreur 403
        if(!isPasswordCorrect) return next(createError(403, "wrong password"));
        // Cree un jeton JWT
        const token = jwt.sign({ id: admin._id }, ENV.TOKEN, { expiresIn: '24h' });


        // recupere les infos de l'utilisateur
        const {password, ...others} = admin._doc;

        // ajoute le jeton dans les cookies de la requete
        res.cookie("access_token", token, {
            // le cookie n'est accessible que sur le serveur
            // et non accessible par le client
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.status(200).json({
            message: "Admin signed in successfully",
            admin: others
        })
    } catch (error) {
        console.log("error", error.message);
    }   
}

// supprimer un admin
const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admins.findByIdandDelete(req.params.id);
        if(!admin) return next(createError(404, "admin not found"));
        res.status(200).json({
            message: "Admin deleted",
            admin
        })
    } catch (error) {
        console.log("error", error.message);
    }
}




// modifier un admin
const updateAdmin = async (req, res) => {
    try {
        const admin = await Admins.findByIdandUpdate(req.params.id, req.body, {new: true});
        if(!admin) return next(createError(404, "admin not found"));
        res.status(200).json({
            message: "Admin updated",
            admin
        })
    } catch (error) {
        console.log("error", error.message);
    }
}

module.exports = {
    postAdmin,
    verifyEmail,
    getAllAdmins,
    getAdmin,
    sign,
    updateAdmin,
    deleteAdmin
}