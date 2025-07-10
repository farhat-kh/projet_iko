import React, { useContext, useState} from 'react';
import { AuthContext} from '../../utils/context/AuthContext';
import { useNavigate, Navigate } from 'react-router';
import Profil from "./Profil";
import Commandes from "./Commandes";
import Parametres from "./Parametres";
import "./moncompte.css";


const MonCompte = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ongletActif, setOngletActif] = useState('profil');

    if(auth?.user.role === "admin" || auth?.user.role === "superadmin") {
        return <Navigate to="/admin" />
    }

    const renderOngletActif = () => {
        switch (ongletActif) {
            case 'profil':
                return <Profil />;
            case 'commandes':
                return <Commandes />;
            case 'parametres':
                return <Parametres />;
            default:
                return <Profil />;
        }
    }
    return (
        <div className="compte-container">
            <h2 className="compte-title">Mon compte</h2>

            <div className="compte-nav">
                <button
                className={ongletActif === "profil" ? "active" : ""} 
                onClick={() => setOngletActif("profil")}>Profil</button>
                <button 
                className={ongletActif === "commandes" ? "active" : ""}
                onClick={() => setOngletActif("commandes")}>Commandes</button>
                <button 
                className={ongletActif === "parametres" ? "active" : ""}
                onClick={() => setOngletActif("parametres")}>Paramètres</button>
            </div>

            <div className="compte-content">
                {renderOngletActif()}
            </div>

            <div className="compte-actions">
            <button onClick={() => navigate("/")} className="btn-retour">Retour à l'accueil</button>
            <button onClick={logout} className="btn-deconnexion">Se déconnecter</button>
            </div>


    </div>
    )
}

export default MonCompte;