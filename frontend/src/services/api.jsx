import axios from "axios";
// Create an instance of Axios with base configuration
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic GET request
export const get = (url, config = {}) => {
  return api.get(url, config);
};

// Generic POST request
export const post = (url, data, config = {}) => {
  return api.post(url, data, config);
};

// Generic PUT request
export const put = (url, data, config = {}) => {
  return api.put(url, data, config);
};

// Generic DELETE request
export const del = (url, config = {}) => {
  return api.delete(url, config);
};

export default api;
