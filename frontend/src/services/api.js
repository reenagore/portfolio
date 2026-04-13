import axios from "axios";

const api = axios.create({
  baseURL: "https://portfolio-q4y8.onrender.com/api",
  withCredentials: true,
});

export default api;