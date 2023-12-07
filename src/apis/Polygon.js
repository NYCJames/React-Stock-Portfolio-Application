import axios from "axios";

const API_KEY = `ApHk9sz3p3OdqFNA7QuFsJTTNjT3uURY`;

export default axios.create({
  baseURL: `https://api.polygon.io/`,
  params: {
    apiKey: API_KEY,
  },
});
