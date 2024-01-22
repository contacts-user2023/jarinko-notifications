import CryptoJS from "crypto-js";
import {getEncryptionKey} from "@/config/config";
const crypto = require('crypto');

const secretKey = getEncryptionKey();

export const encryptMessage = (text: string) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptMessage = (ciphertext: string) => {
  const bytes  = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
