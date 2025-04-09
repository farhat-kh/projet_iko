import React, { useState, useContext } from "react"
import '../../styles/login.css'
import { LOGIN_FIELDS } from "../../utils/configs/FormFields"
import { AuthContext } from "../../utils/context/AuthContext"
import { Link } from "react-router"

const Login = () => {
  const [user, setUser] = useState({})
  const { login, isLoading } = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(user)
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">S’IDENTIFIER</h2>
        <p className="login-subtext">
          Pas encore de compte ? <Link to="/register">Inscrivez-vous ici</Link>
        </p>
        <form onSubmit={handleSubmit}>
          {LOGIN_FIELDS.map((field) => (
            <div key={field.id} className="login-group">
              <label htmlFor={field.id}>{field.label}*</label>
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
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
          <p className="forgot-password">
            <Link to="/motDePasseOublie">Mot de passe oublié ?</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login



















































// import React, { useState, useContext } from 'react'

// // CONSTANTS
// import { LOGIN_FIELDS } from '../../utils/configs/FormFields'

// // CONTEXTE
// import { AuthContext } from '../../utils/context/AuthContext'

// const Login = () => {

//   const [user,setUser]= useState({})
//   const { login } = useContext(AuthContext) 

//     // HandleChange
//     const handleChange = event => {
//       const { name, value } = event.target
//       setUser(prevUser => ({...prevUser, [name]: value }))
//     }
    
//     const handleSubmit = event => {
//       event.preventDefault()
//       login(user)
//     }

//   return (
//     <div>
//       <h1>login</h1>
//       <form onSubmit={handleSubmit} >
//         {LOGIN_FIELDS.map(field => (
//           <div key={field.id}>
//             <label htmlFor={field.id}>{field.label}</label>
//             <input 
//               type={field.type}
//               name={field.name}
//               id={field.id}
//               placeholder={field.placeholder}
//               onChange={handleChange}
//             />
//           </div>
//         ))}
//           <button>Login</button>
//       </form>

//     </div>
//   )
// }

// export default Login