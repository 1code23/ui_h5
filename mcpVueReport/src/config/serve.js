import axios from "axios";
import Vue from "vue";
import { showFullLoading, tryHideFullScreenLoading } from "@/config/loading";
const isProduction = process.env.NODE_ENV === "production";

const instance = axios.create({
  baseURL: isProduction ? "" : "./api",
  timeout: 2 * 60 * 1000, // 请求超时时长
});

// 请求拦截
instance.interceptors.request.use(
  (req) => {
    let token = localStorage.getItem("token");
    if (token) {
      req.headers.token = token;
    }
    return req;
  },
  (error) => {
    return console.error(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    // 实现并发请求只有一个loading
    tryHideFullScreenLoading();
    if (res.data.code == 200) {
      return res.data;
    } else {
      Vue.prototype.$message.error(res.data.message || "请求错误!");
      return Promise.reject(new Error(JSON.stringify(res.data)));
    }
  },
  (error) => {
    //实现并发请求只加载一个loading
    tryHideFullScreenLoading();
    Vue.prototype.$message.error("请求错误!");
    console.log("error", error.response);
    return false;
  }
);

export default (method, url, data, loading = true) => {
  if (loading) {
    showFullLoading();
  }
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
