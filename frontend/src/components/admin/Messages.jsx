import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../utils/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faCalendarAlt,
  faReply,
  faXmark,
  faPaperPlane,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reponse, setReponse] = useState("");
  const { auth } = useContext(AuthContext);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/messages", {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      setMessages(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  const envoyerReponse = async () => {
    try {
      await axios.post(`http://localhost:8000/api/messages/repondre/${selectedMessage._id}`, 
        { reponse },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
          withCredentials: true,
        }
      );
      alert("Réponse envoyée !");
      setReponse("");
      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réponse :", error);
    }
  };

  const supprimerMessage = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du message :", error);
      
    }
  }

  useEffect(() => {
    if (auth?.token) fetchMessages();
  }, [auth]);

  return (
    <div className="messages-container">
      <h2>Messages de contact</h2>
      <div className="messages-grid">
        {messages.map((msg) => (
          <div key={msg._id} className="message-card">
            <div className="message-header">
              <h4>
                <FontAwesomeIcon icon={faUser} /> {msg.nom}
              </h4>
              {msg.repondu && (
                <span className="badge-repondu">
                  <FontAwesomeIcon icon={faCheck} /> Répondu
                </span>
              )}
            </div>
            <p><FontAwesomeIcon icon={faEnvelope} /> {msg.email}</p>
            <p><FontAwesomeIcon icon={faCalendarAlt} /> {new Date(msg.createdAt).toLocaleDateString()}</p>
            <p className="commentaire">📝 {msg.commentaire}</p>
            <div className="message-actions">
              <button onClick={() => setSelectedMessage(msg)}>
                <FontAwesomeIcon icon={faReply} /> Répondre
              </button>
              <button onClick={() => supprimerMessage(msg._id)}>
                <FontAwesomeIcon icon={faTrash} /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Répondre à {selectedMessage.nom}</h3>
            <textarea
              placeholder="Écrire votre réponse..."
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={envoyerReponse}>
                <FontAwesomeIcon icon={faPaperPlane} /> Envoyer
              </button>
              <button onClick={() => setSelectedMessage(null)}>
                <FontAwesomeIcon icon={faXmark} /> Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
