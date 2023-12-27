import axios from 'axios';
import CryptoJS from 'crypto-js'
import { vantToast } from "../utils/index";

let keyStr = "g7Z1pjDI@v4KTUghx6^LvWr7cUurT5cq";//加密密钥
let ivStr = "uYfHR3ydBBnnI&K0";//矢量

// 加密
export function aes_encrypt(word) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var iv = CryptoJS.enc.Utf8.parse(ivStr);

    var encrypted = CryptoJS.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

//解密  
export function aes_decrypt(word) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var iv = CryptoJS.enc.Utf8.parse(ivStr);

    var restoreBase64 = word.replace(/[\r\n]/g, '');
    var decrypt = CryptoJS.AES.decrypt(restoreBase64, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 2 * 60 * 60 * 1000, //超时
})

/*
    拦截请求
*/
instance.interceptors.request.use(request => {
    request.data = aes_encrypt(request.method == "post" ? JSON.stringify(request.data) : request.data);
    return request;
}, function (error) {
    tryHideFullScreenLoading()
    return false;
})

/*
    拦截响应
*/
instance.interceptors.response.use(res => {
    if (typeof res.data == "string" && res.data != "") {
        res.data = JSON.parse(aes_decrypt(res.data));
    }
    console.log(res.data);
    return res
}, (error) => {
    console.log(error);
    let errData = error.response?.data
    let message = errData?.message || errData?.msg || error.message
    vantToast(message || "请求错误!")
    return false;
})


export function getCategoryByThemeId(params) {
    return instance.post("/theme/getCategoryByThemeId", params)
}

export function getThemeInfo(params) {
    return instance.post("/theme/getThemeInfo", params)
}

export function getContentList(params) {
    return instance.post("/theme/getContentList", params)
}

export function getContentAll(params) {
    return instance.post("/theme/getContentAll", params)
}