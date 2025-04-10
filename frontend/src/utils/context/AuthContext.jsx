import React, { createContext, useState,  useEffect} from 'react'
import React,{ Children} from 'react';
import { useNavigate } from 'react-router';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // Hook pour la navigation
  const navigate = useNavigate()

  useEffect(() => {
    isloggedIn()
  }, [])
  //Fonction pour gerer l authentification de user
  const login = async (userDataForm) => {

    try {
      setIsLoading(true)
      // axios
      const {data, status} = await AXIOS_INSTANCE.post(URLS.POST_LOGIN,userDataForm)
        // mettre a jour l etat du state (auth) avec les données de user
        if (status === 200){
          setAuth(data)
  // stocker les données de user en localstorage
  localStorage.setItem('auth', JSON.stringify(data))
  // rediriger vers la page d'accueil
  navigate('/')
  setIsLoading(false)
  
        }

      
        
      
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  const isloggedIn = () => {
    setIsLoggedIn(true)
    // recuperation des infos de user depuis le localstorage
    const currentUser = JSON.parse(localStorage.getItem('auth'))
    const currentUserParsed = currentUser ? JSON.parse(currentUser) : null
    setAuth(currentUserParsed) // mettre a jour l'etat du state (auth) avec les données de user
    setIsLoading(false)
   

 const logout = () => {
  setIsLoading(true)
  setAuth(null) // reinitialise l'etat
  localStorage.removeItem('auth') // supprimer les infos de user dans le localstorage
  navigate('/') //  rediriger vers la page d'accueil
  setIsLoading(false)
 }

  return (
    <AuthContext.Provider value={{login, logout, auth, isLoading}}>
    {children}
    </AuthContext.Provider>
  )
}