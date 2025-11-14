import axios from "axios";
const VITE_URL = import.meta.env.VITE_URL
const api = axios.create({
    baseURL: VITE_URL,
    withCredentials: true
});

export { api };
export default api;