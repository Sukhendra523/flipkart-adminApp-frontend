import axios from "axios";
import { api } from "../urlConfig";

const token = localStorage.getItem("token");
console.log("token :::::::::::", token);
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `bearer ${token}` : "",
  },
});

export default axiosInstance;
