import { instance as Axios } from "./axios.service";

const AuthService = {
  login(payload) {
    return Axios.post(`/login/`, payload)
      .then(response => response)
      .catch(error => console.error("Error: ", error));
  }
};

export default AuthService;