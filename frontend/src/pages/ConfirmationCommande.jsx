import { useLocation, useNavigate } from 'react-router';
import "../styles/confirmationCommande.css";


const confirmationCommande = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { nom , total } = location.state || {};

    if (!nom || !total) {
        return   <p>Informations de commande indisponibles.</p>;
    }
    
    return (
     <div className="commande-wrapper">
      <h1 className="commande-title">Commande validée !</h1>
      <div className="commande-content">
        <div className="commande-summary">
          <p>Merci <strong>{nom}</strong> pour votre commande.</p>
          <p>Total payé : <strong>{Number(total).toFixed(2)} €</strong></p>
          <p>Vous pouvez consulter vos commandes dans votre espace personnel.</p>

          <button className="btn-retour" onClick={() => navigate('/')}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}

export default confirmationCommande;