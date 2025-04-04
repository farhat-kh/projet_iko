const Message = require("../models/message.model");


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

module.exports = {
    postMessage,
    getAllMessages
}






