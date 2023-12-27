export default class barrage {
	constructor(list) {
		this.list = [];
		this.el = "#popRect";
		this.elDom = $("#popRect");
		this.currentNode = null;
		this.historyNode = null;
		this.animateTime = 5000;//动画时间
		this.createTime = 2500;//创建时间
		this.index = 0;
		this.init(list)
	}
	init(list) {
		this.list = list;
        if(!list||list.length<1)return
		this.animate()
		setInterval(this.animate.bind(this), this.createTime)
	}
	animate() {
		let {
			list,
			index,
			elDom,
			animateTime,
			createTime
		} = this;
		let currentData = list[index];
		let str = `<span class="popItem">${currentData}</span>`
		elDom.append(str)
		$(".popItem:last").animate({
			top: "-60px"
		}, animateTime, "", this.delNode)
		if (index < list.length - 1) {
			this.index++
		} else {
			this.index = 0
		}
	}
	delNode(str) {
		$(".popItem:first").remove()
	}
}