import axios from "axios";
// Create an instance of Axios with base configuration
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
