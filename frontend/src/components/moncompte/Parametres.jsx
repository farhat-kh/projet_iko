import React, { useState, useContext } from 'react';
import axios from '../../utils/services/AxiosInstance';
import { AuthContext } from '../../utils/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './parametres.css'; 


const Parametres = () => {
    const { auth, logout} = useContext(AuthContext);

    const [ancienMotDePasse, setAncienMotDePasse] = useState('');
    const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showAncien, setShowAncien] = useState(false);
    const [showNouveau, setShowNouveau] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        if (!ancienMotDePasse || !nouveauMotDePasse || !confirmationMotDePasse) {
            setError("Veuillez remplir tous les champs.");
            return;
        }
        if (nouveauMotDePasse !== confirmationMotDePasse) {
            setError("Les nouveaux mots de passe ne correspondent pas.");
            return;
        }
        try {
            const response = await axios.put(`/user/update-password/${auth.user._id}`, {
                ancienMotDePasse,
                nouveauMotDePasse
            });

            if(response.status === 200) {
                setMessage(response.data.message);
                setAncienMotDePasse('');
                setNouveauMotDePasse('');
                setConfirmationMotDePasse('');
            }
        } catch (error) {
            setError(error.response?.data?.message || "Erreur lors de la mise à jour du mot de passe.");
        }
    }

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
        if(!confirmDelete) return;

        try {
            const response = await axios.delete(`/user/delete/${auth.user._id}`)
            if(response.status === 200) {
                logout(); 
            }
        } catch (error) {
            setError(error.response?.data?.message || "Erreur lors de la suppression du compte.");
            
        }
    }

    return (
        <div className="parametres-container">
      <h2>Paramètres</h2>

      <form onSubmit={handlePasswordChange} 

      className="form-password">
        <h3>Changer mon mot de passe</h3>
        <div className="form-group">
          <label>Ancien mot de passe :</label>
          
          <input
            type={showAncien ? "text" : "password"}
            value={ancienMotDePasse}
            onChange={(e) => setAncienMotDePasse(e.target.value)}
            required
          />
            <span onClick={() => setShowAncien(!showAncien)} className="eye-toggle">
              <FontAwesomeIcon icon={showAncien ? faEyeSlash : faEye} />
            </span>
        </div>
        <div className="form-group">
          <label>Nouveau mot de passe :</label>
          <input
            type={ showNouveau ? "text" : "password"}
            value={nouveauMotDePasse}
            onChange={(e) => setNouveauMotDePasse(e.target.value)}
            required
            placeholder="Minimum 12 caractères"
          />
            <span onClick={() => setShowNouveau(!showNouveau)} className="eye-toggle">
               <FontAwesomeIcon icon={showNouveau ? faEyeSlash : faEye}  />
            </span>
        </div>
        <div className="form-group">
          <label>Confirmer le nouveau mot de passe :</label>
          <input
            type={ showConfirm ? "text" : "password"}
            value={confirmationMotDePasse}
            onChange={(e) => setConfirmationMotDePasse(e.target.value)}
            required
            placeholder="Confirmer le nouveau mot de passe"
          />
            <span onClick={() => setShowConfirm(!showConfirm)} className="eye-toggle">
               <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye}  />
            </span>
        </div>
        <button type="submit">Changer le mot de passe</button>
      </form>

      <hr />

      <div className="suppression-compte">
        <h3>Supprimer mon compte</h3>
        <button onClick={handleDeleteAccount} style={{ backgroundColor: "red", color: "white" }}>
          Supprimer mon compte
        </button>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
    )
}

export default Parametres;