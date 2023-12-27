import axios from 'axios';
import qs from 'qs';

import router from '@/router'


import { showFullLoading, tryHideFullScreenLoading } from '@/config/loading';

const instance = axios.create({
	baseURL: "/api",
	timeout: 2 * 60 * 60 * 1000, //超时
})
/*
	拦截请求
*/
instance.interceptors.request.use(request => {
	request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	// request.headers.Authorization = Developer.storage.getToken() ? `Bearer ${Developer.storage.getToken()}` : ""
	return request;
}, function (error) {
	tryHideFullScreenLoading()
	return false;
})

/*
	拦截响应
*/
instance.interceptors.response.use(res => {
	//实现并发请求只加载一个loding
	tryHideFullScreenLoading()
	// if (res.data.code && res.data.code === 400) {
	// 	// 先清除存储在localStorage里的信息，再跳转登录页
	// 	Developer.storage.clearSession();
	// 	router.go("login");
	// }
	// if ([10001].includes(res.data.code)) {
	// 	return res
	// }
	if (res.data.code && res.data.code !== 1) {
		ElMessage.error(res.data.msg || "请求错误!")
		// return Promise.reject(new Error(JSON.stringify(res)));
		return false;
	}
	return res
}, (error) => {
	// 外层401也是token过期
	// if (error.response.status == 401) {
	// 	// 先清除存储在localStorage里的信息，再跳转登录页
	// 	Developer.storage.clearSession();
	// 	router.go("login");
	// }
	let errData = error.response.data
	let message = errData.message || errData.msg
	ElMessage.error(message || "请求错误!")
	tryHideFullScreenLoading()
	return false;
})

export default function (method, url, data = null, loading = true) {
	if (method == "get" || method == "delete") {
		if (data) {
			url += "?" + qs.stringify(data)
		}
	}
	if (loading) {
		//实现并发请求只加载一个loding
		showFullLoading()
	}
	method = method.toLowerCase();
	switch (method) {
		case "post":
			return instance.post(url, data);
			break;
		case "get":
			return instance.get(url);
			break;
		case "delete":
			return instance.delete(url)
			break;
		case "put":
			return instance.put(url, data)
			break;
		default:
			console.error("未知的请求方式！" + method);
			return false;
			break;
	};
};
