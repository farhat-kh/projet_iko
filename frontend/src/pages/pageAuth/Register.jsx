import React, { useContext,useState } from "react"
import URLS from "../../utils/constants/Api"
import { REGISTER_FIELDS } from "../../utils/configs/FormFields"
import "../../styles/register.css"
import { AuthContext } from "../../utils/context/AuthContext"
import { useNavigate, Link } from "react-router"

const Register = () => {
  const [user, setUser] = useState({})
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { register , isLoading } = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user.email || !user.email.includes("@") || !user.email.includes(".")) {
      setError("Adresse email invalide.")
      return
    }
    if (!user.password || user.password.length < 12) {
      setError("Le mot de passe doit contenir au moins 12 caractères.")
      return
    }
    if (telephone && !/^\d{10}$/.test(user.telephone)) {
      setError("Le numéro de téléphone doit contenir 10 chiffres.")
      return
    }
    if (user.nom && user.nom.length < 2) {
      setError("Le nom doit contenir au moins 2 caractères.")
      return
    }

    try {
      await register(user)
      setMessage("Inscription réussie !")
      setError("")
    } catch (error) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.")
      setMessage("")
    }
  }

  return (
    <div className="inscription-container">
      <h2>INSCRIPTION</h2>
      <p className="obligatoire">* Tous les champs sont obligatoires</p>

      <form onSubmit={handleSubmit} className="inscription-form">
        <div className="civilite">
          <label>
            <input
              type="radio"
              name="civilite"
              value="Monsieur"
              onChange={handleChange}
              required
            />
            Monsieur
          </label>
          <label>
            <input
              type="radio"
              name="civilite"
              value="Madame"
              onChange={handleChange}
              required
            />
            Madame
          </label>
        </div>

        {REGISTER_FIELDS.map((field) => (
         <div key={field.id}>
         <label htmlFor={field.id}>{field.label}</label>
         <input
           type={field.type}
           id={field.id}
           name={field.name}
           placeholder={field.placeholder}
           onChange={handleChange}
           required
         />
       </div>
        ))}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Chargement..." : "S'inscrire"}
        </button>

        <div className="inscription-link">
          <p>
            Déjà un compte ? <Link to="/login">Connectez-vous ici</Link>
          </p>
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        
      </form>
    </div>
  );
};
export default Register



