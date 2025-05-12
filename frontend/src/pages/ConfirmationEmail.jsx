import React from "react";
import { Link } from "react-router";
import "../styles/confirmationEmail.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";


const ConfirmationEmail = () => {
  

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-card">
        <FontAwesomeIcon icon={faCheckCircle} className="confirmation-icon" />
        <h2 className="confirmation-title">Adresse email vérifiée</h2>
        <p className="confirmation-subtext">
          Merci d'avoir confirmé votre adresse email.
        </p>
        <p className="confirmation-text">
          Votre compte est maintenant activé. Vous pouvez vous connecter pour
          accéder à toutes les fonctionnalités.
        </p>
        <Link
          to="/login"
          className="confirmation-link">
          Se connecter
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationEmail;
