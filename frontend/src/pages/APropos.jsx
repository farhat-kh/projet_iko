// import React from 'react'

// function APropos() {
//   return (
//     <div>APropos</div>
//   )
// }

// export default APropos
import React from "react";
import "../styles/apropos.css"; // Import du fichier CSS
// import { Nav } from "react-bootstrap";

import logo from "../assets/logo.png";
import '../styles/apropos.css';
import '../styles/global.css';

const APropos = () => {
  return (
    <>
    

    <div className="apropos-container">
      <header className="apropos-header">
        <img src={logo} alt="IkoMeubles Logo" className="apropos-logo" />
        <h1>À Propos de IkoMeubles</h1>
      </header>
      
      <section className="apropos-content">
        <h2>Notre Histoire</h2>
        <p>
          Fondée en 2024, IkoMeubles s'est donné pour mission de fournir des meubles élégants et modernes
          qui allient design et fonctionnalité. Inspirés par la nature et l'artisanat, nos meubles sont conçus
          pour s'intégrer harmonieusement dans tous les intérieurs.
        </p>
      </section>
      
      <section className="apropos-mission">
        <h2>Notre Mission</h2>
        <p>
          Chaque meuble raconte une histoire. Nous sélectionnons avec soin nos matériaux et nous engageons à offrir
          des produits de qualité, durables et esthétiques pour transformer votre maison en un espace unique.
        </p>
      </section>
      
      <section className="apropos-valeurs">
        <h3>Nos Valeurs</h3>
        <ul>
          <li>✅ Qualité et durabilité</li>
          <li>🌱 Respect de l’environnement</li>
          <li>🎨 Design innovant et élégant</li>
          <li>💡 Satisfaction client avant tout</li>
        </ul>
      </section>

      <section className="apropos-engagements">
        <h4>Nos Engagements</h4>
        <p>
          Chez IkoMeubles, nous privilégions une fabrication éco-responsable et travaillons avec des artisans passionnés.
          Nous nous engageons à minimiser notre impact environnemental tout en garantissant des meubles exceptionnels.
        </p>
      </section>
    </div>
    
    </>
  );
};

export default APropos;
