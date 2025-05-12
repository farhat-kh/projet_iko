import react, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router';

import "../styles/motdepasseoublie.css";


const MotDePasseOublie = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const response = await axios.put("http://localhost:8000/api/user/forgot-password", { email });
            setSuccess(true);
            setMessage(response.data.message || "Instructions de réinitialisation envoyées. Veuillez vérifier votre boîte de réception.");
        } catch (err) {
            setError(err.response.data.error.message);
            setSuccess(false);
            setMessage("une erreur s'est produite lors de l'envoi de l'email.");
        }
    };
    return (
        <div className="reset-container">
        <form onSubmit={handleSubmit} className="reset-form">
          <h1>Mot de passe oublié ?</h1>
          <p>Veuillez entrer votre adresse email pour recevoir un lien de réinitialisation.</p>
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Réinitialiser le mot de passe</button>
          {message &&(<p className={success ? "message success ": "message error"}>{message}</p>)}
          <Link to="/"> Retour à l'accueil</Link>
        </form>
      </div>  
    )
}
export default MotDePasseOublie;