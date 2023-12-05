import axios from "axios";

const API_KEY = `cln6j51r01qkjffmsg10cln6j51r01qkjffmsg1g`;

export default axios.create({
  baseURL: `https://finnhub.io/api/v1/`,
  params: {
    token: API_KEY,
  },
});
