<template>
  <div>
    <!-- <Header></Header> -->
    <div class="topBox"></div>
    <div class="contentBox"></div>
    <div class="disfr jc">
      <div class="joinBtn disfr ac jc" @click="goJoin">立即加入</div>
    </div>
     <div class="footerBox fc ac jc">
      <span class="color3 fw5 titleName">期待您的加入</span>
      <div class="footerContent">欢迎您加入耀火计划， 您随时可以联系我们：zhangxiyun@droi.com，也可点击下方按钮申请加入或查看您的报名。</div>
      <div class="joinBtn disfr ac jc" @click="goJoin">立即加入</div>
    </div>
  </div>
</template>

<script>
// import "@/style/common.css"
import Header from "@/components/Header.vue";

export default {
  name: 'HomeView',
  components: {Header},
  data() {
			return {
				// screenWidth:screen.width, // 屏幕宽度
        // ismobile:false
			}
	},
  // 实时监控宽度
  watch: {
    // screenWidth(val){
    //   this.screenWidth = val
    // }
  },
  created () {
    // 当前页面允许双指缩放
    // document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1')
    // this.setClient()
  },
  // 定义一个方法
  methods: {
    // setClient(){
    //   this.screenWidth = screen.width
    //   document.documentElement.style.fontSize = screen.width/10 + 'px'
    //   console.log(document.documentElement)
    //   if (this.screenWidth > 1280) {// 屏幕大小临界值，可根据自己需求修改
    //     import('@/style/index.css')
    //   } 
    //   else {
    //     this.ismobile = true
    //     import('@/style/indexRem.css')
    //   }
    // },
    goJoin(){
      this.$router.push({ path: '/join' });
    }
  }
}

</script>

<style scoped lang="scss">
.topBox{
  background-image: url("../assets/img/Pkv2x.png");
  background-size: 100% 100%;
  width: 100%;
  width: 7.2rem;
  height: 2.98rem;
}
.contentBox{
  background-image: url("../assets/img/PcontentImg2x.png");
  background-size: 100% 100%;
  width: 6.4rem;
  height: 20.64rem;
  margin: 0.96rem 0.4rem 0.64rem;
  box-sizing: border-box;
}
.footerBox{
  width: 7.2rem;
  height: 6.8rem;
  margin-top: 0.72rem;
  background-image: url("../assets/img/PfootImg2x.png");
  background-size: 100% 100%;
  padding: 0.96rem 0.4rem 1.48rem;
  box-sizing: border-box;
  .titleName{
    font-size: 0.72rem;
  }
  .footerContent{
   margin: 0.48rem 0 0.64rem; 
   font-size: 0.32rem;
  }
}
.joinBtn{
  width: 2.4rem;
  height: 0.96rem;
  background: #333333;
  border-radius: 0.5rem;
  font-size: 0.28rem;
  font-weight: 400;
  color: #FFFFFF;
}
</style>
