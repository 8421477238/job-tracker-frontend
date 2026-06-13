import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-backend-production-90a8.up.railway.app/api",
  timeout: 10000,
});

export default API;