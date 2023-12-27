import "./css/common.css"
import "./css/index.scss"
import 'babel-polyfill'
require("./js/resetSize.js")
import req from './js/http.js';
import VConsole from 'vconsole';
import LotteryPrize from "./js/lotteryPrize";
import barrage from "./js/barrage";
// let vConsole=new VConsole();

import $ from 'jquery';

function refresh(data, responseCallback) {
	location.reload()
}
window.refresh = refresh




function countDown() {
	var hour = document.querySelector('.countDownH');
	var minute = document.querySelector('.countDownM');
	var second = document.querySelector('.countDownS');
	var hourE = document.querySelector('.countDownHE');
	var minutE = document.querySelector('.countDownME');
	var secondE = document.querySelector('.countDownSE');
	let date = new Date();
	let dateTimes = date.getTime()
	let dateSplit = "/"
	var Y = date.getFullYear() + dateSplit;
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + dateSplit;
	var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
	var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + '';
	let countTime
	if (h < 3) {
		countTime = new Date(Y + M + D + " " + h + ":00:00")
	} else {
		let next = new Date(Y + M + D + " 03:00:00")
		countTime = new Date(next.getTime() + 1000 * 60 * 60 * 24)
	}
	var times = (countTime - dateTimes) / 1000; // times是剩余时间的总的毫秒数
	var h = parseInt(times / 60 / 60 % 24);
	h = h < 10 ? '0' + h : h; //判断数值小于10的情况 如 0-9改为 00-09
	hour.innerHTML=h;
	hourE.innerHTML=h;
	var m = parseInt(times / 60 % 60);
	m = m < 10 ? '0' + m : m;
	minute.innerHTML=m;
	minutE.innerHTML=m;
	var s = parseInt(times % 60);
	s = s < 10 ? '0' + s : s;
	second.innerHTML=s;
	secondE.innerHTML=s;
	let refreTime=""+h+m+s;
	if(refreTime=="000000"){
		window.refresh()
		return
	}
}
window.showLoading=function showLoading(){
	$(".loading").removeClass("disNone")
}
window.hideLoading=function hideLoading(){
	$(".loading").addClass("disNone")
}
window.onload = function () {
	$(".Wrap").removeClass("disNone")
	countDown()
	setInterval(countDown,1000)
	let Lottery,Barrage;
	let lotteryAPI=window.Lottery;
	let chipId=lotteryAPI.getChipid();
	let brand=lotteryAPI.getBrand();//getBrand品牌
	let model=lotteryAPI.getModel()// getModel是型号  
	console.log(model)
	let reminder=lotteryAPI.isReminder()
	lotteryAPI.onStatistics("lottery","lookPage","");


	// 911292064229123
	//372881743667414
	//977635326893123
	//372881743667414
	// let chipId="977635326893123"
	
	req("get","/v1/draw/prizes",{chipId:chipId})
	.then(res=>{
		if(!res)return;
		let data=res.data.data
		data.chipId=chipId
		data.brand=brand
		data.model=model
		data.reminder=reminder
		console.log(data)
		lotteryAPI.onInit(data.adShowCount-data.adSeeCount>0)
		Lottery=new LotteryPrize(data.prizes,data)
		Barrage=new barrage(data.boomUsers)
		window.hideLoading()
	}).catch(res=>{
		window.hideLoading()
	})


	// 点击弹窗阴影弹窗消失
	function hideToast(){
		$(".toastBox").addClass("disNone")
		$(".toast").addClass("disNone")
		$(".toastLottery").addClass("disNone")
		$(".ruleToast").addClass("disNone")
		$(".hotServe").addClass("disNone")
		$(".getCountToast").addClass("disNone")
	}

	$(".toastMask").click(hideToast)
	$(".close").click(hideToast)
	$(".hotClose").click(hideToast)
	$(".hotBtn").click(function(){
		hideToast()
		lotteryAPI.onCallPhone("13472770534")
	})

	function rulesIf(){
		$(".toastBox").removeClass("disNone")
		$(".ruleToast").removeClass("disNone")
		lotteryAPI.onStatistics("lottery","activeRules","");
	}
	function feedBack(){
		lotteryAPI.onFeedback()
		lotteryAPI.onStatistics("lottery","handleFeedBack","");
	}
	function pageBack(){
		lotteryAPI.onBack();
		lotteryAPI.onStatistics("lottery","pageBack",Lottery.activeCount);
	}
	function calPhone(){
		$(".toastBox").removeClass("disNone")
		$(".hotServe").removeClass("disNone")
	}
	// 规则
	$(".rulesEntry").click(rulesIf)
	// 反馈
	$(".feedback").click(feedBack)
	// 返回
	$("#pageBack").click(pageBack)
	//热线
	$(".agreement").click(calPhone)
	
	
	document.querySelector('.toastBox').addEventListener('touchmove', function (event) {
		event.preventDefault(); 
	})
	document.querySelector('.ruleToast').addEventListener('touchmove', function (event) {
		event.stopPropagation(); 
	})
	document.querySelector('#loading').addEventListener('touchmove', function (event) {
		event.preventDefault();
	})
	let company=document.querySelector('.company')
	function hammer(e){
			if(e.touches.length>2){
				vConsole = new VConsole();
			}else{
				vConsole = null
			}
	}
	company.addEventListener("touchstart", hammer);


}