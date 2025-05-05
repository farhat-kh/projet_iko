import React, { useContext } from 'react'
import { AuthContext } from '../utils/context/AuthContext'
import { useNavigate } from 'react-router'
import panierVide from "../assets/Panier_vide.png"
import "../styles/panier.css"





const  Panier =()=> {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleConnect = () => {
    localStorage.setItem("redirectAfterLogin", "/panier")
    navigate("/compte")
  }
  return (
    <div className="panier-container">
      {auth ? (
        <div>
          <h2>Votre Panier</h2>
          <p>Contenu à venir...</p>
        </div>
      ) : (
        <div className='panier-vide'>
          <img src={panierVide} alt="Panier vide" className="panier-vide" />
          <h2>Votre Panier est vide</h2>
          <button onClick={handleConnect}>connectez-vous pour continuer</button>
          
        </div>
      )}
    </div>
  )
}
export default Panier