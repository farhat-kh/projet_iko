import React, { useContext,useState, useEffect } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import axios from '../../utils/services/AxiosInstance';
import './profil.css';


const Profil = () => {

    const { auth, setAuth } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (auth && auth.user) {
            setFormData({
                nom: auth.user.nom || "",
                prenom: auth.user.prenom || "",
                email: auth.user.email || "",
                telephone: auth.user.telephone || "",
            });
        }
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if(formData.telephone === auth.user.telephone) {  
            setMessage("Aucune modification apportée.");
            setError("");
            return;
        }
        try {
            const response = await axios.put(`/user/update/${auth.user._id}`, {telephone: formData.telephone});
            
            
            if(response.status === 200 || response.status === 204) {
                const updatedUser = { ...auth.user, telephone: formData.telephone };
                const updatedAuth = { ...auth, user: updatedUser };
                localStorage.setItem("auth", JSON.stringify(updatedAuth));
                setAuth(updatedAuth);
                setMessage("Vos informations ont été mises à jour avec succès.");
                setError("");
            } else {
                setError("Erreur inatendue lors de la mise à jour des informations.");
                setMessage("");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil:", error);
            setError(" Erreur lors de la mise a jour");
            setMessage("");
        }
    }
    
    return (
        <div className="profil-container">
      <h2>Mon Profil</h2>
      <form onSubmit={handleSubmit} className="profil-form">
        <div className="form-group">
          <label>Nom :</label>
          <input type="text" value={formData.nom} disabled />
        </div>
        <div className="form-group">
          <label>Prénom :</label>
          <input type="text" value={formData.prenom} disabled />
        </div>
        <div className="form-group">
          <label>Email :</label>
          <input type="email" value={formData.email} disabled />
        </div>
        <div className="form-group">
          <label>Téléphone :</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder={formData.telephone ? "" : "Entrez votre numéro"}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>

    )
    
}

export default Profil;