import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";
// const BASE_URL = "https://fleet-api.onrender.com/api";

// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
// };

export const instance = axios.create({ baseURL: BASE_URL });

