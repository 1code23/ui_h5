import "./css/common.css"
import "./css/index.scss"
import 'babel-polyfill'

require("./js/resetSize.js")
// import VConsole from 'vconsole';

import Vue from 'vue'
new Vue({
  el: '#box',
  data: {
		list:[],
		phoneNum:"",
		deviceId:"IMEI、MEID、Android ID",
  },
	created(){
		let query= decodeURI(location.search).split("?")[1];
		let token=query?query.split("=")[1]:"";
		fetch("https://api-spare.oo523.com:8060/order/list", {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		})
		.then(response => response.json())
		.then(data =>{
			let deviceId=data.data.deviceId
			this.deviceId=deviceId.slice(0,4)+("*").repeat(deviceId.length-7)+deviceId.slice(-3)
			data.data.list.forEach(a=>{
				a.CreatedAt=this.timestampToTime(new Date(a.CreatedAt).getTime())
			})
			this.list=data.data.list
			this.phoneNum=data.data.phoneNum;
			window.hideLoading()
		});
	},
	methods:{
		 timestampToTime(timestamp, str = "-") {
			if (typeof timestamp == "string") {
				//兼容IOS获取时间戳出现NAN问题
				timestamp = timestamp.replace(/-/g, '/');
			}
			var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + str;
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + str;
			var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
			var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':';
			var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ':';
			var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return Y + M + D+" " +h+m+s;
		},
	}
})


function refresh(data, responseCallback) {
	location.reload()
}
window.refresh = refresh



const loadingDom=document.getElementById("loading")
window.showLoading=function showLoading(){
	loadingDom.classList.remove("disNone")
}
window.hideLoading=function hideLoading(){
	loadingDom.classList.add("disNone")
}
