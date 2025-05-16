import axios from "axios"


const API_URL = 'http://localhost:8000/api'

const AXIOS_INSTANCE = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    }
})

AXIOS_INSTANCE.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.error?.message
        if (message === "jwt expired") {
        localStorage.removeItem("auth")
        window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)
export default AXIOS_INSTANCE