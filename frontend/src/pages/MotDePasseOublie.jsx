import React from "react";
import "../styles/motdepasseoublie.css";
import Navbar from "../components/templates/Navbar";
import Footer from "../components/templates/Footer";

const MotDePasseOublie = () => {
  return (
    <>
      <Navbar />
      <div className="forgot-password-container">
        <h2>Mot de passe oublié</h2>
        <p>Entrez votre adresse e-mail pour réinitialiser votre mot de passe.</p>
        <form>
          <label htmlFor="email">Adresse e-mail*</label>
          <input type="email" id="email" name="email" required />
          <button type="submit">Envoyer</button>
        </form>
        <a href="/compte">Retour à la connexion</a>
      </div>
      <Footer />
    </>
  );
};

export default MotDePasseOublie;
