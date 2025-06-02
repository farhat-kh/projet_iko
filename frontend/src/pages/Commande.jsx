import React, { useState, useContext, useEffect } from 'react';
import { useCart } from '../utils/context/CartContext';
import { AuthContext } from '../utils/context/AuthContext';
import { useNavigate } from 'react-router';
import "../styles/commande.css";
import PayPalButton from '../components/PayPalButton';
import axios from 'axios';

const Commande = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: ''
  });

  
  useEffect(() => {
 
    if(auth && auth.user) {
      setFormData({
        nom: auth.user.nom || '',
        email: auth.user.email || '',
        telephone: auth.user.telephone || '',
        adresse: '',
        ville: '',
        codePostal: ''
      });
    }
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuccessPayment = async (details) => {
   
    if(!auth.user.telephone && !formData.telephone) {
      try {
        await axios.put(`/api/user/${auth.user._id}`, {
          telephone: formData.telephone
        });
      } catch (error) {
        console.log("Erreur lors de la mise à jour du téléphone :", error);
        
      }
    }
    if (!auth) {
      navigate("/login");
      return;
    }
    

    
    clearCart();
    navigate("/confirmation-commande", {
      state: {
        nom: formData.nom,
        email: formData.email,
        total: totalPrice()
      }
    }); 
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  }

  return (
    <div className="commande-wrapper">
      <h2 className="commande-title">Finaliser votre commande</h2>
      <div className="commande-content">
        
        
        <form className="commande-form">
          <h3>Informations personnelles</h3>
          <p>Entrez vos coordonnées pour la livraison</p>

          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
            />
          </div>

          <div className="double-inputs">
            <div className="form-group">
              <label>Ville</label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Code postal</label>
              <input
                type="text"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>


        
        <div className="commande-summary">
          <h3>Résumé de la commande</h3>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.nom} × {item.quantity} — {(item.prix * item.quantity).toFixed(2)} €
              </li>
            ))}
            <li>Livraison — Gratuite</li>
            <li><strong>Total : {totalPrice().toFixed(2)} €</strong></li>
          </ul>

        
           {isFormValid ? (
            <PayPalButton
             total={totalPrice()}
             panierData={cart}
             livraisonData={formData}
             onSuccess={handleSuccessPayment}
            />
          ) : (
             <p style={{ color: 'red', marginTop: '1rem' }}>
              Veuillez remplir tous les champs de livraison pour activer le paiement PayPal.
             </p>
           )}
         

          <button className="btn-retour" onClick={() => navigate("/panier")}>
            Retour au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Commande;
