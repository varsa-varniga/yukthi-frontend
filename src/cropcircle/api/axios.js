// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // your backend URL
  withCredentials: true, // use if your backend sets cookies/auth
});

export default api;
