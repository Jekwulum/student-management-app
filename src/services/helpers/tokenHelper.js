import { configs } from "./constants";
import CryptoJS from 'crypto-js';

const tokenHelper = {
  checkIfLoggedIn() {
    const decryptedToken = tokenHelper.decryptAndRetrieveToken();
    if (decryptedToken) {
      const decodedToken = JSON.parse(atob(decryptedToken.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      // Check if the token is not expired
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true;
      }
    }
    return false;
  },

  encryptAndSaveToken(token) {
    try {
      const encryptedToken = CryptoJS.AES.encrypt(token, configs.SECRET_KEY).toString();
      localStorage.setItem('encryptedToken', encryptedToken);
    } catch (error) {
      console.error('Error encrypting and saving token:', error);
    }
  },

  encryptAndSaveRefreshToken(token) {
    try {
      const encryptedToken = CryptoJS.AES.encrypt(token, configs.SECRET_KEY).toString();
      localStorage.setItem('encryptedRefreshToken', encryptedToken);
    } catch (error) {
      console.error('Error encrypting and saving token:', error);
    }
  },

  decryptAndRetrieveToken() {
    try {
      const encryptedToken = localStorage.getItem('encryptedToken');
      if (encryptedToken) {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, configs.SECRET_KEY);
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedToken;
      }
    } catch (error) {
      console.error('Error decrypting and retrieving token:', error);
    }
    return null;
  },

  decryptAndRetrieveRefreshToken() {
    try {
      const encryptedToken = localStorage.getItem('encryptedRefreshToken');
      if (encryptedToken) {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, configs.SECRET_KEY);
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedToken;
      }
    } catch (error) {
      console.error('Error decrypting and retrieving token:', error);
    }
    return null;
  },

  clearEncryptedToken() {
    localStorage.removeItem('encryptedToken');
    localStorage.removeItem('encryptedRefreshToken');
  }
};

export default tokenHelper;
