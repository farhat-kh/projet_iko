const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const createError = require('./error')

const verifieToken = (req, res, next) =>{
    // recupere le jeton (token) jwt a partir des cookies de la requete
    const token = req.cookies.access_token;

    // si le token n'est pas present , on renvoie une erreur (accès refusé)
    if(!token) return next(createError(401,'Access denied'))
    
    // verifier la validité du token en utilisant JWT.VERIFY
    jwt.verify(token,ENV.TOKEN, (err, user) =>{
        // si une erreur se produit lors de la verification  du token
        if(err){

            // Renvpoie une erreur 403 (interdit)
            // car le token n'est pas valide 
            return next(createError(403,'token non valide ', err.message))
        }
        // si la verification reussit, ajoute les informations de l'utilisateur dans l'objet req
        req.user = user

        next()
    })
}

module.exports = verifieToken;