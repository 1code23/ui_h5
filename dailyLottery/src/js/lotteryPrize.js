import req from './http.js';
let closeImg = require("./../images/close.png")
export default class LotteryPrize {
	_count = 0;
	_activeCount = 0;
	_adSeeCount = 0;
	_money = 0;
	_reminder = false;
	_closeImg = closeImg;
	req = req;
	constructor(list, data) {
		this.turntableBox = $("#turntableBox");
		this.pointer = $("#pointer");
		this.pointerEnd = $("#pointerEnd");
		this.rotatefire = $("#rotatefire");
		this.hightcircle = $("#hightcircle");
		this.DALETOU = document.getElementById("daletou");
		this.lotteryAPI = window.Lottery;
		this.count = data.adShowCount; //总次数
		this.activeCount = data.available; //可抽
		this.adSeeCount = data.adSeeCount; //已看
		this.money = data.balance;
		this.ticket = data.ticket;
		this.chipId = data.chipId;
		this.model = "";
		this.brand = "";
		this.reminder = data.reminder;
		this.toast = null
		this.config = {
			duration: 3000, // 总旋转时间
			circle: 8, // 旋转圈数
			mode: 'ease-in-out'
		};
		this.rotateAngle = 0; //初始角度
		this.angleList = []; //角度位置
		this.list = list;
		this.rotateAngle = 0; //初始角度
		this.CIRCLE_ANGLE = 360; //一圈
		this.index = 0;
		this.prize;
		this.init(list, data);
		this.formatPrizeList(list)
	}
	get activeCount() {
		return this._activeCount
	}
	set activeCount(value) {
		this._activeCount = value
		this.changeTodayActive()
	}
	get adSeeCount() {
		return this._adSeeCount
	}
	set adSeeCount(value) {
		this._adSeeCount = value
		this.changeTodayActive()
	}
	get money() {
		return this._money
	}
	set money(value) {
		this._money = value
		this.changeMoney()
	}
	get ticket() {
		return this._ticket
	}
	set ticket(value) {
		this._ticket = value
		this.changeticket()
	}
	get reminder() {
		return this._reminder
	}
	set reminder(value) {
		this._reminder = value
		this.changeReminder()
	}
	init(list, data) {
		this.pointer.click(this.debounce(this.beginRotate.bind(this),200))
		this.model = data.model;
		this.brand = data.brand;
		this.render(list)
		this.changeTodayActive()
		this.DALETOU.currentTime = 2
		this.rotaEnd();
		this.initEvent()
	}
	random(max, min = 0) {
		return parseInt(Math.random() * (max - min + 1) + min)
	}
	// 格式化奖品列表，计算每个奖品的位置
	formatPrizeList(list) {
		// 记录每个奖的位置
		const angleList = []

		const l = list.length
		// 计算单个奖项所占的角度
		const average = this.CIRCLE_ANGLE / l

		// 循环计算给每个奖项添加style属性
		list.forEach((item, i) => {
			// 记录每个奖项的角度范围
			angleList.push((i * average))
		})
		this.angleList = angleList

	}
	beginRotate() {//开始抽奖判断
		
		if (this.count - this.adSeeCount > 0 && this.activeCount < 1) {
			$(".contTxt2").html(`${this.count-this.adSeeCount}`)
			$(".toastBox").removeClass("disNone")
			$(".getCountToast").removeClass("disNone")
			return
		}
		if (this.activeCount < 1) {
			return
		}
		window.showLoading()
		this.onStatistics("handlePrize")
		this.req("post", "/v1/draw/prizes", {
				chipId: this.chipId,
				body: {
					model: `${this.brand} ${this.model}`
				}
			})
			.then(res => {
				window.hideLoading()
				if (res) {
					let data = res.data.data
					console.log(data, "data")
					// 随机获取下标
					this.index = this.list.findIndex(item => item.id == data.id);
					this.prize = data
					console.log(this.index)
					this.activeCount--
					// 开始旋转
					this.rotating()
				} else {
					this.showToastMsg("请求错误")
				}
			})

	}
	rotating() {//转盘
		const {
			angleList,
			config,
			rotateAngle,
			index
		} = this;
		const angle =
			// 初始角度
			rotateAngle +
			// 多旋转的圈数
			config.circle * this.CIRCLE_ANGLE +
			// 奖项的角度
			angleList[index] -
			(rotateAngle % this.CIRCLE_ANGLE);
		this.rotateAngle = angle;

		const {
			pointer,
			rotatefire,
			hightcircle,
			turntableBox
		} = this;

		// this.DALETOU.play()
		pointer.removeClass("pointerAni")
		rotatefire.removeClass("disNone");
		hightcircle.removeClass("disNone")
		turntableBox.css({
			"transition": `transform ${this.config.duration}ms ${this.config.mode}`,
			"transform": `rotate(${this.rotateAngle}deg)`
		});
		setTimeout(() => {
			rotatefire.css({
				"transition": `transform ${this.config.duration}ms ${this.config.mode}`,
				"transform": " rotate(3600deg)"
			});
		}, 100)
		setTimeout(() => {
			$(".selectPrize").fadeIn("fast",()=>{
				$(".selectPrize").fadeOut("slow")
				rotatefire.addClass("disNone")
				hightcircle.addClass("disNone")
				pointer.addClass("pointerAni")
				rotatefire.css({
					"transition": `transform  0ms `,
					"transform": " rotate(0deg)"
				});
				this.DALETOU.currentTime = 2
				this.DALETOU.pause()

				this.showPrizeToast()
				this.rotaEnd()
			});
			
		}, this.config.duration)
	}
	render(list) {
		let str = ""
		list.forEach((item, index) => {
			let childStr = `<span class="moneysign"></span>`
			if (item.type < 2) {
				childStr = `<span class="moneysign">￥</span>${item.amount}`
			}
			str += `	<div class="prizeItem tc fc ac" style="transform: rotate(-${index*45}deg);">
					<span class="prizeName">${item.type>1?'优惠券':'现金'}</span>
					<span class="prizeNum disib">${childStr}</span>
			</div>`
		})
		this.turntableBox.append(str);
	}
	rotaEnd() {
		if (this.count - this.adSeeCount < 1 && this.activeCount < 1) {
			this.pointerEnd.removeClass("disNone")
			this.pointer.addClass("disNone")
		}
	}
	showToastMsg(msg) {//展示弹窗msg
		$(".toastMsg").html(msg)
		$(".toastMsg").fadeIn("fast", "linear", ()=>{
			setTimeout(() => {
				this.hideToastMsg()
			}, 500);
		});
	}
	showPrizeToast() {
		let {
			prize
		} = this
		if (this.prize.type == 2) { //优惠券
			prize.details.date = this.filterDate(prize.details.expireTime)
			this.onStatistics("prizeCoupons")
			$(".toastLottery").html(`
			<div class="lotteryBg disfr">
				<div class="lotteryNum tc noWapp">${prize.details.money}<span class="num2">${prize.details.type===1?'元':'折'}</span>
				</div>
				<div class="flex1 fc lottery">
					<p class="tc disfr ac jc">
						<img class="lotteryLogo" src="${prize.details.brandLogo}" alt="">
						<span class="lotteryName tl flex1 noWapp">${prize.details.name}</span>
					</p>
					<div class="lotteryTime tc">有效时间:${prize.details.date} </div>
				</div>
			</div>
			<div class="lotteryInfo tc">
				可在“活动首页— 我的奖券”中查看
			</div>
			<div class="lotteryBtns disfr ac jsb">
				<div class="cancel lotteryBtn tc">放弃领取</div>
				<div class="confim lotteryBtn tc">立即领取</div>
			</div>`)
			$(".toastLottery").removeClass("disNone")

		}
		if (this.prize.type == 1) { //现金
			this.onStatistics("prizeMoney")
			$(".toast").html(`	<div class="priceNum tc"><span class="moneysign">￥</span>${this.prize.amount}</div>
			<div class="toastInfo tc">您抽到了${this.prize.amount}元现金奖励！</div>
			<div class="prizeNews">
				<p>获奖须知：</p>
				<p>根据《个人所得税法》要求，中奖金额属于个人偶然所得，须缴纳20%的个人所得税，该税额将在提现时扣取</p>
			</div>
			<div class="getNum tc">看个广告，再抽一次</div>
			<div class="notes">注：中奖的奖金存放在我的奖金中</div><img class="closeMoney" src="${this._closeImg}" alt="">`)
			$(".toast").removeClass("disNone")
		}
		$(".toastBox").removeClass("disNone")

	}
	hideToast() {//隐藏遮罩层
		$(".toastBox").addClass("disNone")
		$(".toast").addClass("disNone")
		$(".toastLottery").addClass("disNone")
		$(".ruleToast").addClass("disNone")
		$(".hotServe").addClass("disNone")
		$(".getCountToast").addClass("disNone")
	}
	hideToastMsg() {
		$(".toastMsg").fadeOut("slow")
	}
	changeTodayActive() {//改变今日可抽次数
		$(".lotteryNumTxt").html(this.activeCount)
		let noGet = this.count - this.adSeeCount
		$(".txtNum").html((noGet > 0 ? noGet : 0))
		if (this.count - this.adSeeCount < 1) {
			$(".receiveBtn").html("已领取")
			$(".receiveBtn").addClass("receiveBtnOver")
			$(".weiguoqi").addClass("disNone")
			$(".yiguoqi").removeClass("disNone")
		}
	}
	changeMoney() {
		$(".prizeMoney .prizeNum").html(`${this.money} <span>元</span>`)
	}
	changeticket() {
		$(".prizeTicket .prizeNum").html(`${this.ticket} <span>张</span> `)
	}
	changeReminder() {
		$(".remindBtn").html(`${this.reminder?"已添加":"添加提醒"}`)
	}
	initEvent() {//初始事件
		$(".toast").click(e => {
			let elem = e.target || e.srcElement;
			if (elem.className && elem.className.indexOf("getNum") > -1) {
				this.hideToast()
				this.onStatistics("lookAd")
				this.onWatchAd()
			}
			if (elem.className && elem.className.indexOf("closeMoney") > -1) {
				this.hideToast()
				this.onStatistics("prizeMoneyClose")
			}
		})
		$(".toastLottery").click(e => {
			let elem = e.target || e.srcElement;
			if (elem.className && elem.className.indexOf("cancel") > -1) {
				this.onStatistics("giveUpCoupons", this.prize.details.id)
				this.hideToast()
			}
			if (elem.className && elem.className.indexOf("confim") > -1) {
				this.onStatistics("receiveCoupons", this.prize.details.id)
				this.req("post", "/v1/draw/coupons", {
						chipId: this.chipId,
						body: {
							id: this.prize.details.id
						}
					})
					.then(res => {
						this.hideToast()
						this.showToastMsg(res.data.msg)
						setTimeout(window.refresh, 300)
					})
			}
		})
		$(".receiveBtn").click(this.onWatchAd.bind(this))
		$(".goGetBtn").click(()=>{
			this.hideToast()
			this.onWatchAd()
		})
		// 添加/取消提醒
		$(".remindBtn").click(this.debounce(this.goReminder.bind(this),200))
		// 提现
		$(".onWithDraw").click(this.debounce(this.goWithDraw.bind(this),200))
		// 去使用优惠券
		$(".goUselottery").click(this.debounce(this.goUseCoupon.bind(this),200))
	}
	goUseCoupon(){
		window.Lottery.onLottery()
	}
	goReminder(){
		this.onStatistics("handleReminder")
		window.Lottery.onReminder()
	}
	goWithDraw(){
		if (this.money > 0) {
			window.Lottery.onWithDraw(this.money)
			this.onStatistics("handleWithdrawal")
		} else {
			this.showToastMsg("您当前无奖金可提现")
		}
	}
	filterDate(timestamp, str = "-") {
		// if (typeof timestamp == "string") {
		//   //兼容IOS获取时间戳出现NAN问题
		//   timestamp = timestamp.replace(/-/g, '/');
		// }
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + str;
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + str;
		var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
		var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y + M + D;
	}
	onWatchAd() {

		this.onStatistics("handleReceiveNum")
		
		if (this.count > this.adSeeCount) {
			window.Lottery.onWatchAd(true)
		} else {
			window.Lottery.onWatchAd(false)
		}
	}
	onStatistics(evt, data = "") {
		if (this.lotteryAPI) this.lotteryAPI.onStatistics("lottery", evt, data);
	}
	debounce(fn, delay) {//防抖
		let timer = null 
		return function () {
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(fn, delay) 
		}
	}

}