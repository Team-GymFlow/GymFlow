import axios from "axios";

const API = import.meta.env.VITE_API_BASE;

export default axios.create({
  baseURL: API
});
