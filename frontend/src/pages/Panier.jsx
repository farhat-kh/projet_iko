import React, { useContext } from 'react'
import { useCart } from '../utils/context/CartContext'
import { AuthContext } from '../utils/context/AuthContext'
import { useNavigate } from 'react-router'
import panierVide from "../assets/Panier_vide.png"
import { FaTrashAlt } from 'react-icons/fa'
import "../styles/panier.css"





const  Panier =()=> {
  const { auth } = useContext(AuthContext)
  const { cart, removeFromCart, addToCart, clearCart, totalPrice } = useCart()
  const navigate = useNavigate()

  const handleAdd = (item) => addToCart(item, 1)
  const handleRemove = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1)
    } else {
      removeFromCart(item._id)
    }
  }
  const handleConnect = () => {
    localStorage.setItem("redirectAfterLogin", "/panier")
    navigate("/compte")
  }

  if(!auth) {
    return (
      <div className='panier-vide'>
        <img src={panierVide} alt="Panier vide" className="panier-vide-img" />
        <h1>Votre Panier est vide</h1>
        <button onClick={handleConnect}>connectez-vous pour continuer</button>
      </div>
    ) 
  }

  if(cart.length === 0) {
    return (
      <div className='panier-vide'>
        <img src={panierVide} alt="Panier vide" className="panier-vide" />
        <h2>Votre Panier est vide</h2>
        <button onClick={() => navigate("/categories")}>Continuez vos achats</button>
      </div>
    )
  }
    return (
      <div className="panier-wrapper">
      <div className="panier-left">
        <h3>MON PANIER</h3>
        <table className="panier-table-header">
          <thead>
            <tr>
              <th>PRODUIT</th>
              <th>PRIX</th>
              <th>QUANTITÉ</th>
              <th>TOTAL</th>
              <th></th>
            </tr>
          </thead>
        </table>

        {cart.map((item) => (
          <div className="panier-item" key={item._id}>
            <div className="panier-item-img">
              <img src={item.imageUrl} alt={item.nom} />
            </div>
            <div className="panier-item-info">
              <h4>{item.nom}</h4>
              <p>{item.prix} €</p>
            </div>
            <div className="panier-quantite">
              <button onClick={() => handleRemove(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleAdd(item)}>+</button>
            </div>
            <div className="panier-total">{(item.prix * item.quantity).toFixed(2)} €</div>
            <div className="panier-delete">
              <FaTrashAlt onClick={() => removeFromCart(item._id)} />
            </div>
          </div>
        ))}
      </div>

      <div className="panier-right">
        <h5>RÉCAPITULATIF DE LA COMMANDE</h5>
        <hr />
        <div className="panier-rec">
          <span>Total</span>
          <span>{totalPrice().toFixed(2)} €</span>
        </div>
        <button className="btn-commander" onClick={() => navigate("/commande")}>
          COMMANDER
        </button>
        <button className="btn-continuer" onClick={() => navigate("/categories")}>
          CONTINUER VOS ACHATS
        </button>
      </div>
    </div>
  );
    
}
export default Panier