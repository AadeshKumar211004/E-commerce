import axios from "axios";

const API = axios.create({
  baseURL:"https://e-commerce-backend-o495.onrender.com/api",
});

// 🔥 AUTO TOKEN ATTACH
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
