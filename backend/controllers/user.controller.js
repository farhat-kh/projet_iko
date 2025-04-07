const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const createError = require('../middlewares/error');


// model 
const Users= require('../models/user.model');


// ajouter un utilisateur
const postUser = async (req, res, next) => {
    try {
        // recupere les donnees de l'utilisateur envoyees dans le corps de la requete
        const { nom, prenom, email, password } = req.body;

        // hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);


        // on enovie un email a notre nouvel utilisateur avec le lien de verification
        // await sendEmail(user, token)

        // creation de l'utilisateur
        const user = await Users.create({
            nom,
            prenom,
            email,
            password: hashedPassword
        });

        // Cree un jeton JWT
        const token = jwt.sign({ id: user._id }, ENV.TOKEN, { expiresIn: '24h' });


        res.status(201).json({
            message: "User created successfully",
            user
        })
} catch (error) {
    console.log("error", error.message);
}
}





// recuperer tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        console.log("error", error.message);
    }
}



// recuperer un utilisateur
const getUser = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.log("error", error.message);
    }
}



// verifier l'authentification
const sign = async (req, res , next) => {
    try {
        // recherche l'utilisateur dans la base de données par son mail
        const user = await Users.findOne({ email: req.body.email });
        // si l'utilisateur n'existe pas , renvoie une erreur 404
        if(!user) return next(createError(404, "user not found"));
        // verifie si le mot de passe est correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        // si le mot de passe est incorrect, renvoie une erreur 403
        if(!isPasswordCorrect) return next(createError(403, "wrong password"));
        // Cree un jeton JWT
        const token = jwt.sign({ id: user._id }, ENV.TOKEN, { expiresIn: '24h' });


        // recupere les infos de l'utilisateur
        const {password, ...others} = user._doc;

        // ajoute le jeton dans les cookies de la requete
        res.cookie("access_token", token, {
            // le cookie n'est accessible que sur le serveur
            // et non accessible par le client
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.status(200).json({
            message: "User signed in successfully",
            user
        })

        }
         catch (error) {
            console.log("error", error.message);
            res.status(500).json({
                message: error.message
            })
        }

 }



// supprimer un utilisateur
const deleteUser = async (req, res, next) => {
    try {
        // verifie si l'utilisateur est authentifie
        if(!req.user || !req.user.id){ 
            // console.log(req.user);
            
            return next(createError(401, "autentification requise"))

        }
        // recherche l'utilisateur dans la base de données par son id ( si user existe)
        const user = await Users.findById(req.params.id);
        // si l'utilisateur n'existe pas , renvoie une erreur 404
        if(!user) return next(createError(404, "user not found"));
        // verifie si l'utilisateur a le droit de supprimer le compte
        if(user._id.toString() !== req.user.id.toString()) return next(createError(403, "accès refusé"));

        // supprime l'utilisateur de la base de données
        //const deletedUser = await Users.findByIdAndDelete(req.params.id);

        // desactive l'utilisateur
        user.isActive = false;
        await user.save();
        res.status(200).json({
            message: "utilisateur supprimé",
        })

    } catch (error) {
        console.log("error", error.message);
    }
}

// modifier un utilisateur
const updateUser = async (req, res, next) => {
    try {
        // verifie si l'utilisateur est authentifie
        if(!req.user || !req.user.id){ 
            // console.log(req.user);
            
            return next(createError(401, "autentification requise"))

        }
        // trouver l'utilisateur par son id
        const user = await Users.findById(req.params.id);
        if(!user) return next(createError(404, "user not found"));
        // verifie si l'utilisateur a le droit de modifier le compte
        if(user._id.toString() !== req.user.id.toString()) return next(createError(403, "accès refusé"));

        // mettre a jour l'utilisateur
        const userUpdated = await Users.findByIdandUpdate(req.params.id, req.body, {new: true});
        
        res.status(200).json({
            message: "User updated",
            userUpdated
        })
    } catch (error) {
        console.log("error", error.message);
    }
}





module.exports = {
    postUser,
    getAllUsers,
    getUser,
    sign,
    deleteUser,
    updateUser
}