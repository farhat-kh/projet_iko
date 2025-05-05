import React , { useContext } from 'react'
import { AuthContext } from '../../utils/context/AuthContext'
import Login from './Login'

const Compte = () => {
    const { auth, logout } = useContext(AuthContext)
    return (
        <div>
            {auth ? (
        <div>
          <h2>Bienvenue, {auth.user?.prenom} {auth.user?.nom}</h2>
          <button onClick={logout} style={{ marginTop: "1rem", background: "#e74c3c", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Se déconnecter
          </button>
        </div>
            ) : (
                <Login />
            )}
        </div>
    )

}

export default Compte