import React, { useState } from 'react';
import api from '../utils/services/AxiosInstance';
import { useParams, useNavigate, Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash , faLock , faKey} from '@fortawesome/free-solid-svg-icons';
import "../styles/resetPassword.css";



const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [ newPassword, setNewPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");
    const [error , setError] = useState("");
    const [ successMsg , setSuccessMsg] = useState("");
    const [ showPassword, setShowPassword] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(newPassword.length < 12) {
            setError("le mot de passe doit contenir au moins 12 caractères");
            return;
        }
        if(newPassword !== confirmPassword) {
            setError("les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await api.put(`/user/reset-password/${token}`, { newPassword });
            setSuccessMsg(response.data.message);
            setNewPassword("");
            setConfirmPassword("");
            setError("");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setError("une erreur s'est produite lors de la réinitialisation du mot de passe");
        }
    };
    return (

        <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h1>Réinitialiser le mot de passe</h1>
        <p>Veuillez saisir votre nouveau mot de passe ci-dessous</p>

        <div className="input-wrapper">
          <FontAwesomeIcon icon={faLock} className="eye-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className="eye-toggle">
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        {newPassword && newPassword.length < 12 && (
          <p className="error-message">Le mot de passe doit contenir au moins 12 caractères</p>
        )}

        <div className="input-wrapper">
          <FontAwesomeIcon icon={faKey} className="eye-icon" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-toggle">
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        {confirmPassword && confirmPassword !== newPassword && (
          <p className="error-message">Les mots de passe ne correspondent pas</p>
        )}

        {error && <p className="error-message">{error}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <button type="submit">Réinitialiser le mot de passe</button>
        <Link to="/">Retour à l'accueil</Link>
      </form>
    </div>
    )
}

export default ResetPassword;

