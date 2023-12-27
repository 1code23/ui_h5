import axios from 'axios';
import qs from 'querystring';
import * as crypto from './crypto';
let baseURL="http://10.20.40.244:39092"
// let baseURL=""
const instance = axios.create({
	baseURL: baseURL,
	timeout: 60000 //30S延时
})
const buildEnv="production"  //development  production
/*
  拦截请求
*/
instance.interceptors.request.use(request => {
    
	
	if(process.env.NODE_ENV == buildEnv){
		if( request.method == "post" || request.method == "put"){
			// request.headers['Content-Type'] = 'text/plan';
		}
	} else {//不加密
		// request.headers["c"] = "7191514"
	}
	

	return request;
}, function (error) {
	return false;
})

/*
  拦截响应
*/
instance.interceptors.response.use(res => {
	let data = res.data || {};
	//res.status 200成功，数据需要进行解密
	if(res.status==200 ){
		res.data = JSON.parse(crypto.Decrypt(data))
	}

	return res
}, (error) => {
	let errData=error.response.data
	let message=errData.message||errData.msg
    console.log(message)
	$(".toastMsg").html(message)
		$(".toastMsg").fadeIn("fast", "linear", ()=>{
			setTimeout(() => {
				$(".toastMsg").fadeOut("slow")
			}, 500);
		});
	return false;
})

export default function (method, url, data = {},loading=true) {
	let timestamp=Math.round(new Date().getTime()/1000)
	let header = {
		chipId: data.chipId,
		timestamp: timestamp
	}
	data.header=header;
	console.log(data)
	
	delete data.chipId
	if (method == "get" || method == "delete") {
		if(data){
			url+="?body="+encodeURIComponent(crypto.Encrypt(JSON.stringify(data)))
		}
	}else{
		data=crypto.Encrypt(JSON.stringify(data))
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
