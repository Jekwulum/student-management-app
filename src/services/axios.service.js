import axios from "axios";
import tokenHelper from "./helpers/tokenHelper";

const BASE_URL = "http://127.0.0.1:8000/api";

export const instance = axios.create({ baseURL: BASE_URL });

instance.interceptors.request.use((request) => {
  const token = tokenHelper.decryptAndRetrieveToken();
  const headers = { 'Content-Type': 'application/json', 'authorization': `Bearer ${token}` }

  if (tokenHelper.checkIfLoggedIn()) request.headers = headers;
  else request.headers = { 'Content-Type': 'application/json' };
  return request;
}, error => Promise.reject(error));

instance.interceptors.response.use(response => response, error => {
  const token = tokenHelper.decryptAndRetrieveToken();
  if (error.response.status === 401 && token) {
    tokenHelper.clearEncryptedToken();
    window.location.href = '/login';
  } else return error.response;
});