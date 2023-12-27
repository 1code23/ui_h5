
/*加密代码*/
const CryptoJS = require('crypto-js');  //引用AES源码js

const key = "g7Z1pjDI@v4KTUghx6^LvWr7cUurT5cq";  //十六位十六进制数作为密钥
const iv = 'uYfHR3ydBBnnI&K0';   //十六位十六进制数作为密钥偏移量

//解密方法
export function Decrypt(text) {
    let baseResult = CryptoJS.enc.Base64.parse(text);   // Base64解密
    let ciphertext = CryptoJS.enc.Base64.stringify(baseResult);     // Base64解密
    let decryptResult = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {    //  AES解密
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();
    return resData;
}

//加密方法
export function Encrypt(text) {
    var srcs = CryptoJS.enc.Utf8.parse(text);
    var encrypted= CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}