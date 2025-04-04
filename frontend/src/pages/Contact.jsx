import React from "react";
import "../styles/contact.css";
import Navbar from "../components/templates/Navbar";
import Footer from "../components/templates/Footer";
import { useState } from "react";

const Contact = () => {
  // state 
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
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.nom.length >= 3 && user.prenom.length >= 3 && user.email.length >= 8 && user.commentaire.length >= 10) {
      setCheck(true);
      setError("");
    } else {
      setCheck(false);
      setError("Veuillez remplir tous les champs");
    }
  };



  return (
    <>
    <Navbar/>
    <div className="contact-container">
      <nav className="breadcrumb">
        <span className="breadcrumb-item active" >Accueil</span> /
        <span className="breadcrumb-item"> Contactez-nous</span>
      </nav>

      <div className="contact-form-container">
        <h2 className="form-title">CONTACTEZ NOUS</h2>
        {check && <p className="successMessage">{`Merci pour votre commentaire ${user.nom}`}</p>}
        {error && <p className="errorMessage">{error}</p>}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom *</label>
          <input type="text" id="nom" name="nom" onChange={handleChange} required />

          <label htmlFor="prenom">Prénom *</label>
          <input type="text" id="prenom" name="prenom" 
          onChange={handleChange} required />

          <label htmlFor="email">E-mail *</label>
          <input type="email" id="email" name="email" 
          onChange={handleChange} required />

          <label htmlFor="commentaire">Commentaire *</label>
          <textarea id="commentaire" name="commentaire"
          onChange={handleChange} required></textarea>

          <button type="submit" className="submit-btn">SOUMETTRE</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
