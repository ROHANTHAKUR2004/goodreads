import { default as axios } from "axios";

const instance = axios.create();
instance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3006/api/v1";

export default instance;