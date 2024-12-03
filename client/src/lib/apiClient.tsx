import axios from "axios";

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_REST_API,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default ApiClient;
