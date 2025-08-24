import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import AXIOS_INSTANCE from '../services/AxiosInstance'
import URLS from '../constants/Api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  
  const [auth, setAuth] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('auth'))
    if (currentUser) setAuth(currentUser)
  }, [])

  const login = async (formData) => {
    try {
      setIsLoading(true)
      const { data, status } = await AXIOS_INSTANCE.post(URLS.POST_LOGIN, formData)
      if (status === 200) {
        const payload = {
          token: data.token,
          user: data.user,
        }
        localStorage.setItem("auth", JSON.stringify(payload))
        setAuth(payload)

        const role = data.user?.role;
        let redirect = "/mon-compte";
        if(role === "admin" || role === "superadmin") {
          redirect = "/admin";
        }
        redirect = localStorage.getItem("redirectAfterLogin") || redirect;
        localStorage.removeItem("redirectAfterLogin")
        
        navigate(redirect)
      }
    } catch (error) {
      const message = error?.response?.data?.error?.message || "Une erreur s'est produite lors de la connexion."
      throw new Error(message);
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (formData) => {
    try {
      setIsLoading(true);
      const { data, status } = await AXIOS_INSTANCE.post(URLS.POST_REGISTER, formData);
      if (status === 201) {
        return { success: true };
        navigate("/login");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    } finally {
      setIsLoading(false);
    }
  };


const logout = async () => {
    try {
      await AXIOS_INSTANCE.get(URLS.GET_LOGOUT, { withCredentials: true });
    } catch (error) {
      console.error("Erreur lors de la deconnexion :", error);
    } finally {
      localStorage.removeItem("auth");
      setAuth(null);
      navigate("/");
    }
  };



  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext