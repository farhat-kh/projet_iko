const Message = require("../models/message.model");
const createError = require("../middlewares/error");



const postMessage = async (req, res, next) => {
    try {
        const { nom, prenom, email, commentaire } = req.body;
    
        const emailsInterdits = ["exemple.com", "mailinator.com", "tempmail.com", "test.com"];
        const emailEstInterdit = emailsInterdits.some((motCle) =>
          email.toLowerCase().includes(motCle)
        );
    
        if (emailEstInterdit) {
          return next(createError(400, "Adresse email non autorisée."));
        }
    
        const message = new Message({
          nom,
          prenom,
          email,
          commentaire,
          date: new Date(),
        });
    
        const savedMessage = await message.save();
        res.status(201).json({
          message: "Message envoyé avec succès",
          data: savedMessage,
        });
      } catch (error) {
        next(createError(500, "Erreur lors de l'envoi du message"));
      }
    };


const getAllMessages = async (req, res, next) =>{
    try {
        const messages = await Message.find().sort({date: -1});
        res.status(200).json(messages);
    } catch (error) {
        next(createError(500, "Erreur lors de la récupération des messages"));
    }
}



const deleteMessage = async (req, res,next) => {
    try {
        const id = req.params.id;
        const deleted = await Message.findByIdAndDelete(id);

        if (!deleted) {
            return next(createError(404, "Message non trouvé"));
        }

        res.status(200).json({
            message: "Message supprimé avec succès",
        });
    } catch (error) {
        next(createError(500, "Erreur lors de la suppression du message"));
    }
}




module.exports = {
    postMessage,
    getAllMessages,
    deleteMessage
}






