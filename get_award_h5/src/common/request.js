import axios from "axios";
import { showFailToast } from "vant";
const instance = axios.create({
  baseURL: "https://bestgame-activity.oo523.com",
  // baseURL: "http://192.168.48.170:8110",
  timeout: 2 * 60 * 1000, //超时
});

// 请求拦截
instance.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    return console.error(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    //拦截数据响应
    if (res.data.code == 0) {
      return res.data;
    } else {
      showFailToast(res.data.msg || "请求错误")
      return Promise.reject(new Error(JSON.stringify(res.data)));
    }
  },
  (error) => {
    //实现并发请求只加载一个loading
    showFailToast("请求错误")
    console.log("error", error.response);
    return false;
  }
);

export default (method, url, data) => {
  method = method.toLowerCase();
  switch (method) {
    case "post":
      return instance.post(url, data);
    case "get":
      return instance.get(url, { params: data });
    case "delete":
      return instance.delete(url, { params: data });
    case "put":
      return instance.put(url, data);
    default:
      console.error("未知的请求方式！" + method);
      return false;
  }
};
