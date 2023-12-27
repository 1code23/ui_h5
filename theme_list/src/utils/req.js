import axios from "axios";
import qs from "qs";
import CryptoJS from "crypto-js";
import { showToast } from "vant";

let keyStr = "g7Z1pjDI@v4KTUghx6^LvWr7cUurT5cq"; //加密密钥
let ivStr = "uYfHR3ydBBnnI&K0"; //矢量

// 加密
export function aes_encrypt(word) {
  var key = CryptoJS.enc.Utf8.parse(keyStr);
  var iv = CryptoJS.enc.Utf8.parse(ivStr);

  var encrypted = CryptoJS.AES.encrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

//解密
export function aes_decrypt(word) {
  var key = CryptoJS.enc.Utf8.parse(keyStr);
  var iv = CryptoJS.enc.Utf8.parse(ivStr);

  var restoreBase64 = word.replace(/[\r\n]/g, "");
  var decrypt = CryptoJS.AES.decrypt(restoreBase64, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 2 * 60 * 60 * 1000, //超时
});

/*
    拦截请求
*/
instance.interceptors.request.use(
  (request) => {
    console.log(request);
    if (request.method == "get" && JSON.stringify(request.param) != "{}") {
      request.url =
        request.url + "?" + aes_encrypt(qs.stringify(request.param));
    } else {
      request.data = aes_encrypt(qs.stringify(request.data));
    }
    return request;
  },
  function (error) {
    tryHideFullScreenLoading();
    return false;
  }
);

/*
    拦截响应
*/
instance.interceptors.response.use(
  (res) => {
    if (typeof res.data == "string" && res.data != "") {
      res.data = JSON.parse(aes_decrypt(res.data));
    }
    console.log(res.data, res.config.url, res);
    return res;
  },
  (error) => {
    console.log(error);
    let errData = error.response?.data;
    let message = errData?.message || errData?.msg || error.message;
    showToast(message || "请求错误!");
    return false;
  }
);

export function getCategoryList(param = {}) {
  return instance({
    url: "/screen/goods/cateList",
    param,
  });
}

export function getSearchList(param = {}) {
  return instance({
    url: "/screen/goods/search",
    param,
  });
}

export function getGoodsList(param = {}) {
  return instance({
    url: "/screen/goods/recommend",
    param,
  });
}

export function getGoodsLink(id, param = {}) {
  return instance({
    url: `/screen/goods/pdd/${id}`,
    param,
  });
}
