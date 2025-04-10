const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const createError = require('../middlewares/error');
//const sendEmail = require('../services/nodemailer');


// model 
const Users= require('../models/user.model');


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
            role
        });

        // on envoie un e-mail à notre nouvel utilisateur avec le lien de vérification
        const token = jwt.sign({ id: user._id, role: user.role }, ENV.TOKEN, { expiresIn: '24h' });
        await sendEmail(user, token)

        res.status(201).json({
            message: "Utilisateur créé avec succès",
            user
        })
    } catch (error) {
        console.log("erreur", error.message);
    }
}

/*
const verifyEmail = async(req, res, next) => {
   try {
       const { token } = req.params;

       // Vérifier si le token est valide
       const decodedToken = jwt.verify(token, ENV.TOKEN);
       if (!decodedToken) {
           return res.status(400).json({
               message: 'Token invalide ou expiré'
           });
       }

       // Mettre à jour l'utilisateur
       const userVerified = await Users.findByIdAndUpdate(
           decodedToken.id, { isVerified: true }, { new: true }
       );

       if (!userVerified) {
           return res.status(404).json({
               message: 'Utilisateur non trouvé'
           });
       }

       res.status(200).json({
           message: 'Email vérifié avec succès ! Votre compte est activé.',
           user: userVerified
       });

   } catch (error) {
       console.error('Erreur de vérification:', error);
       if (error.name === 'TokenExpiredError') {
           return res.status(400).json({
               message: 'Le lien de vérification a expiré. Veuillez vous réinscrire.'
           });
       }
       res.status(400).json({
           message: 'Erreur lors de la vérification de l\'email',
           error: error.message
       });
   }
}
*/



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
        // si user est desactive , renvoie une erreur 403
        if(!user.isActive) return next(createError(403, "ce compte est desactive"));
        // si le mot de passe est incorrect, renvoie une erreur 403
        if(!isPasswordCorrect) return next(createError(403, "wrong password"));
        // Cree un jeton JWT
        const token = jwt.sign({ id: user._id, role: user.role }, ENV.TOKEN, { expiresIn: '24h' });


        // recupere les infos de l'utilisateur
        const {password, ...userWithoutPassword} = user._doc;

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
            user: userWithoutPassword
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
        // recherche l'utilisateur dans la base de données par son id
        const user = await Users.findById(req.params.id);

        // si l'utilisateur n'existe pas , renvoie une erreur 404
        if(!user) return next(createError(404, "utilisateur non trouve"));

        // si l'utilisateur connecté n'est ni admin ni superadmin , il ne peut supprimer que lui-meme
        if(req.user.role !== "admin" && req.user.role !== "superadmin") {
            if (user._id.toString() !== req.user.id.toString()) {
              return next(createError(403, "Accès refusé"));
            }
            }
      

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
      // Vérifie si l'utilisateur est authentifié
    if (!req.user || !req.user.id) {
        return next(createError(401, "Authentification requise"));
      }
  
      // Trouver l'utilisateur cible
      const user = await Users.findById(req.params.id);
      if (!user) {
        return next(createError(404, "Utilisateur non trouvé"));
      }
  
      // Si l'utilisateur connecté n'est ni admin/superadmin ni lui-même, refuser l'accès
      if (
        req.user.role !== "admin" &&
        req.user.role !== "superadmin" &&
        req.user.id !== user._id.toString()
      ) {
        return next(createError(403, "Accès refusé"));
      }
  
      // Mise à jour du mot de passe si présent
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
  
      // Met à jour l'utilisateur
      const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      res.status(200).json({
        message: "Utilisateur mis à jour avec succès",
        updatedUser,
      });  
    
    } catch (error) {
     next(createError(500, error.message)) }
}





module.exports = {
    postUser,
    // verifyEmail,
    getAllUsers,
    getUser,
    sign,
    deleteUser,
    updateUser
}