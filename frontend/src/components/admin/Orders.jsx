import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../utils/context/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClock,
  faTruckLoading,
  faUser,
  faEnvelope,
  faCalendarAlt,
  faLocationDot,
  faBox,
  faCreditCard,
  faXmark,
  faRotate
} from "@fortawesome/free-solid-svg-icons";
import "./commandes.css";

const Orders = () => {
  const [commandes, setCommandes] = useState([]);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const { auth } = useContext(AuthContext);

  const fetchCommandes = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/commande', {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      setCommandes(data);
    } catch (error) {
      console.error('Erreur récupération commandes :', error);
    }
  };

  const handleUpdateStatut = async (id, nouveauStatut) => {
    try {
      await axios.put(`http://localhost:8000/api/commande/${id}`, { status: nouveauStatut }, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      fetchCommandes();
    } catch (error) {
      console.error("Erreur mise à jour statut :", error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchCommandes();
  }, [auth]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const getStatusIcon = (status) => {
    if (status === "validée") return <FontAwesomeIcon icon={faCircleCheck} color="green" />;
    if (status === "en cours") return <FontAwesomeIcon icon={faClock} color="#e67e22" />;
    if (status === "préparation") return <FontAwesomeIcon icon={faTruckLoading} color="#e1a600" />;
    return <FontAwesomeIcon icon={faClock} />;
  };

  return (
    <div className="orders-container">
      <h2>Gestion des commandes</h2>

      {commandes.map((cmd) => (
        <div className="order-card" key={cmd._id}>
          <div className="order-header">
            <strong>Commande #{cmd._id.slice(-5).toUpperCase()}</strong>
            <span className={`badge ${cmd.status}`}>
              {getStatusIcon(cmd.status)} {cmd.status}
            </span>
          </div>

          <p><FontAwesomeIcon icon={faUser} /> {cmd.userId?.nom} {cmd.userId?.prenom}</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> {cmd.userId?.email}</p>
          <p><FontAwesomeIcon icon={faCalendarAlt} /> {formatDate(cmd.createdAt)}</p>

          <p><FontAwesomeIcon icon={faBox} /> Articles : {cmd.produits?.map(p => p.produitId?.nom).join(', ')}</p>

          <div className="order-footer">
            <strong>{cmd.total} €</strong>
            <div className="order-actions">
              <button onClick={() => setSelectedCommande(cmd)}>Détails</button>
              {cmd.status !== "validée" && (
                <button onClick={() => handleUpdateStatut(cmd._id, "validée")}>
                  <FontAwesomeIcon icon={faRotate} /> Valider
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {selectedCommande && (
        <div className="modal-overlay" onClick={() => setSelectedCommande(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Détails de la commande #{selectedCommande._id.slice(-5).toUpperCase()}</h3>
            <p><FontAwesomeIcon icon={faCalendarAlt} /> {formatDate(selectedCommande.createdAt)}</p>
            <hr />
            <h4><FontAwesomeIcon icon={faUser} /> Client</h4>
            <p>{selectedCommande.userId?.nom} {selectedCommande.userId?.prenom}</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> {selectedCommande.userId?.email}</p>
            <h4><FontAwesomeIcon icon={faLocationDot} /> Livraison</h4>
            <p>{selectedCommande.adresseLivraison}</p>
            <h4><FontAwesomeIcon icon={faBox} /> Articles</h4>
            {selectedCommande.produits.map((p, i) => (
              <p key={i}>{p.produitId?.nom} – Qté : {p.quantite}</p>
            ))}
            <h4><FontAwesomeIcon icon={faCreditCard} /> Total : {selectedCommande.total} €</h4>
            <p>Paiement : {selectedCommande.paiementEffectue ? "✔️ Payé" : "❌ Non payé"}</p>
            <button className="close-btn" onClick={() => setSelectedCommande(null)}>
              <FontAwesomeIcon icon={faXmark} /> Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
