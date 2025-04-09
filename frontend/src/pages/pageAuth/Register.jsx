import React, { useState } from "react"
import axios from "axios"
import URLS from "../../utils/constants/Api"
import { REGISTER_FIELDS } from "../../utils/configs/FormFields"
import "../../styles/register.css"
import AXIOS_INSTANCE from "../../utils/services/AxiosInstance"

const Register = () => {
  const [user, setUser] = useState({
    civilite: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    telephone: "",
    email: "",
    password: ""
  })

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await AXIOS_INSTANCE.post(URLS.POST_REGISTER, user)
      setMessage("Inscription réussie !")
      setError("")
      console.log("Réponse back-end :", response.data)
    } catch (err) {
      setMessage("")
      setError("Une erreur est survenue lors de l'inscription.")
      console.error("Erreur :", err)
    }
  }

  return (
    <div className="inscription-container">
      <form className="inscription-form" onSubmit={handleSubmit}>
        <h2>Créer votre compte</h2>
        <p className="obligatoire">*Champs obligatoires</p>

        <div className="civilite">
          <label>
            <input
              type="radio"
              name="civilite"
              value="monsieur"
              onChange={handleChange}
            />
            Monsieur
          </label>
          <label>
            <input
              type="radio"
              name="civilite"
              value="madame"
              onChange={handleChange}
            />
            Madame
          </label>
        </div>

        {REGISTER_FIELDS.map((field) => (
          <input
            key={field.id}
            type={field.type}
            name={field.name}
            id={field.id}
            placeholder={field.label + "*"}
            onChange={handleChange}
            required
          />
        ))}

        <button type="submit">VALIDER</button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="inscription-link">
          <p>Vous avez déjà un compte ? <a href="/login">Se connecter</a></p>
        </div>
      </form>
    </div>
  )
}

export default Register



