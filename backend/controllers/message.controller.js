const Message = require("../models/message.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../config/env"); 


const postMessage = async (req, res) => {
    try {
       const message = new Message({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        commentaire: req.body.commentaire
       }) 
       const savedMessage = await message.save();
       res.status(201).json(savedMessage)
       console.log(savedMessage);
       
    } catch (error) {
        res.status(500).json({message:"Erreur lors de l'envoi du message "})
    }
};

const getAllMessages = async (req, res) =>{
    try {
        const messages = await Message.find().sort({date: -1});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({message:"Erreur lors de la récupération des messages"})
    }
}



const deleteMessage = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("id recu :", id);
        
        const message = await Message.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({ message: "Message non trouvé" });
        }
        
        res.status(200).json({ message: "Message supprimé avec succès" });
    } catch (error) {
        
        res.status(500).json({ message: "Erreur lors de la suppression du message" });
    }
}




module.exports = {
    postMessage,
    getAllMessages,
    deleteMessage
}






