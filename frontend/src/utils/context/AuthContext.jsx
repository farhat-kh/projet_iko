import React, { createContext, useState, useEffect} from 'react'

// URL CONSTANT
import URLS from '../constants/Api'
// import axios from 'axios'
import AXIOS_INSTANCE from '../services/AxiosInstance'

// Créer un contexte d'authentification
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  // Etat pour stocker les informations de l'user connecté.
  const [auth, setAuth] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  //Fonction pour gerer l authentification de user
  const login = async (userDataForm) => {

    try {
      setIsLoading(true)
      // axios
      const {data, status} = await AXIOS_INSTANCE.post(URLS.POST_LOGIN,userDataForm)
        // mettre a jour l etat du state (auth) avec les données de user
        setAuth(data)

        // stocker les données de user en localstorage
        localStorage.setItem('auth', JSON.stringify(data))

        setIsLoading(false)
      
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
 const logout = () => {
  setAuth(null) // reinitialise l'etat 
  localStorage.removeItem('auth') // supprimer les infos de user dans le localstorage
 }

  return (
    <AuthContext.Provider value={{login, logout, auth, isLoading}}>
    {children}
    </AuthContext.Provider>
  )
}