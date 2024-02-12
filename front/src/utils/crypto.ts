import CryptoJS from 'crypto-js';

const secretKey = "ILIKEMONDAYS";

//암호화
export const encrypt = (value: string) => {
    let text= value.toString();
    const data = {
        id: text
    }
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encodeURIComponent(encrypted);
}

//복호화
export const decrypt = (value: string) => {
    return CryptoJS.AES.decrypt(decodeURIComponent(value), secretKey);
}