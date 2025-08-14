import React, { useState } from "react";
import "../styles/contact.css";
import api from "../utils/services/AxiosInstance";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Contact = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    commentaire: "",
  });

  const [check, setCheck] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nom, prenom, email, commentaire } = user;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const blockedDomains = /@example\.com$|@test\.com$/; 
    if(!emailRegex.test(email)) {
      setCheck(false);
      setError("Adresse e-mail invalide.");
      return;
    }
    if(blockedDomains.test(email)) {
      setCheck(false);
      setError("Domaine de l'adresse e-mail bloqué.");
      return;
    }
    if (
      nom.length >= 3 &&
      prenom.length >= 3 &&
      email.length >= 8 &&
      commentaire.length >= 10
    ) {
      try {
        await api.post("/messages", user);
        setCheck(true);
        setError("");
        setUser({ nom: "", prenom: "", email: "", commentaire: "" });

        setTimeout(() => {
          navigate("/");
        }, 5000);
      } catch (err) {
        setCheck(false);
        setError(
          err.response?.data?.error?.message ||
            "Erreur lors de l'envoi du message."
        );
      }
    } else {
      setCheck(false);
      setError("Veuillez remplir tous les champs correctement.");
    }
  };

  return (
    <div className="contact-container">
      <nav className="navigation">
      <Link to="/" className="navigation-item">Accueil /</Link> 
      <span className="navigation-item active">Contactez-nous</span>
      </nav>

      <div className="contact-form-container">
        <h2 className="form-title">CONTACTEZ NOUS</h2>

        {check && (
          <p className="successMessage">
            Merci pour votre message, {user.nom}. Redirection en cours...
          </p>
        )}
        {error && <p className="errorMessage">{error}</p>}

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom *</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={user.nom}
            onChange={handleChange}
            required
          />

          <label htmlFor="prenom">Prénom *</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={user.prenom}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-mail *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="commentaire">Commentaire *</label>
          <textarea
            id="commentaire"
            name="commentaire"
            value={user.commentaire}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="submit-btn">
            SOUMETTRE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
