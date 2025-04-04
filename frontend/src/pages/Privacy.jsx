import React from "react";
import "../styles/privacy.css";
import Navbar from "../components/templates/Navbar";
import Footer from "../components/templates/Footer";

const Privacy = () => {
  return (
    <>
    <Navbar/>
    <div className="privacy-container">
      <header className="privacy-header">
        <h1>Politique de Confidentialité</h1>
      </header>
      
      <section className="privacy-content">
        <h2>1. Introduction</h2>
        <p>
          Chez IkoMeubles, la protection de vos données personnelles est une priorité.
          Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
        </p>
      </section>
      
      <section className="privacy-section">
        <h2>2. Collecte des Données</h2>
        <p>
          Nous collectons certaines informations lorsque vous utilisez notre site, notamment votre nom,
          votre adresse e-mail et d'autres données nécessaires pour améliorer nos services.
        </p>
      </section>
      
      <section className="privacy-section">
        <h2>3. Utilisation des Données</h2>
        <p>
          Vos données sont utilisées pour améliorer votre expérience, vous envoyer des offres promotionnelles et
          assurer un service client efficace.
        </p>
      </section>
      
      <section className="privacy-section">
        <h3>4. Protection des Données</h3>
        <p>
          Nous mettons en place des mesures de sécurité strictes pour protéger vos informations contre tout accès non autorisé.
        </p>
      </section>
      
      <section className="privacy-section">
        <h4>5. Vos Droits</h4>
        <p>
          Vous avez le droit d'accéder, de modifier ou de supprimer vos données personnelles en nous contactant directement.
        </p>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default Privacy;
