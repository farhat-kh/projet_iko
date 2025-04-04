import React from "react";
import { useState } from "react";
import "../styles/compte.css";
import "../styles/global.css";
import { Link } from "react-router";
import Navbar from "../components/templates/Navbar";
import Footer from "../components/templates/Footer";

 

const Compte = () => {

  const [username, setUsername] = useState({
    email: "",
    password: "",
  });
  const [check, setCheck] = useState(false);
  const [error, setError] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsername(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.email.length >= 7 && username.password.length >= 8) {
      setCheck(true);
      setError("");

    } else {
      setCheck(false);
      setError("Veuillez remplir tous les champs");
    }
  }
  return (
    <>
      <Navbar />
      <div className="compte-container">
        <h1 className="compte-title">Mon compte</h1>
        <div className="compte-box">
          <h2 className="compte-subtitle">S'IDENTIFIER</h2>

          <p className="compte-text">
            Pas encore de compte ? <Link to="/inscription">Inscrivez-vous ici</Link>
          </p>
          <p className="compte-text">{error && <span style={{ color: "red" }}>{error}</span>} </p>
          <form className="compte-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Adresse mail*</label>
            <input type="email" id="email"
            name="email"
            onChange={handleChange}
            required />

            <label htmlFor="password">Mot de passe*</label>
            <input type="password" id="password" 
            name="password"
            onChange={handleChange} 
             required />

            <button type="submit" className="compte-btn">Se connecter</button>
          </form>
          <Link to="/motDePasseOublie" className="compte-forgot">Mot de passe oublié ?</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Compte;
