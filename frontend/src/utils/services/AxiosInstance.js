import axios from "axios"


const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    throw new Error("VITE_API_URL is not defined in the environment variables");
}

const AXIOS_INSTANCE = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    }
})

AXIOS_INSTANCE.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("auth");
    if (raw) {
      const { token } = JSON.parse(raw) || {};
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (_) {}
  return config;
});

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