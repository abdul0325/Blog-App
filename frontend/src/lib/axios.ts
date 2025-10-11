// /lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Your Express backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
