import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import api from '../../utils/services/AxiosInstance';
import './commandes.css'; 


const Commandes = () => {

    const { auth } = useContext(AuthContext);
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const response = await api.get("/commande/user");
              
                
                setCommandes(response.data);
            } catch (error) {
                setError("Erreur lors de la récupération des commandes.");
            }
            finally {
                setLoading(false);
            }  
        }    
        if(auth?.user?._id) {
            fetchCommandes();
        }
    }, [auth]);
       if (loading) return <p>Chargement des commandes...</p>;
       if (!Array.isArray(commandes) || commandes.length === 0) return <p>Aucune commande trouvée.</p>;
       if (error) return <p style={{ color: "red" }}>{error}</p>;

       return (
        <div className="commandes-container">
      <h3>Mes Commandes</h3>
      <ul className="commande-liste">
        {commandes.map((commande) => (
          <li key={commande._id} className="commande-item">
            <p><strong>Date :</strong> {new Date(commande.createdAt).toLocaleDateString()}</p>
            <p><strong>Total :</strong> {commande.total} €</p>
            <p><strong>Statut :</strong> {commande.paiementEffectue ? "Payée" : "En attente"}</p>
            <div className="adresse-livraison">
            <p><strong>Adresse de livraison :</strong></p>
             <p>{commande.adresseLivraison}</p>
            </div>

            <ul>
              {commande.produits.map((item, index) => (
                <li key={index}>
                  {item.produitId?.nom || "Produit"} × {item.quantite} — {(item.prixUnitaire * item.quantite).toFixed(2)} €
                </li>
              ))}
            </ul>
          </li>

        ))}
      </ul>
    </div>
    );
};

export default Commandes;