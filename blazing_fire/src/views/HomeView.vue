<template>
  <div>
    <Header></Header>
    <div class="topBox disfr ac jc">
      <div class="topBox_content">
        <span class="title">耀火计划</span>
        <div class="topBox_content_text">“耀火计划”是卓易科技于2023年7月宣布启动的一项全球免费推广激励计划，该计划基于千万级流量市场资源，持续面向全球中小开发者免费推广，与开发者携手共筑全场景智慧化数字服务生态，通过耀火计划流量推广助力、广告sdk支持、开放能力接入，优质内容分发、共建，服务分发、生态共建、技术能力接入等领域，提供覆盖广告SDK接入、用户增长、商业推广、广告变现、合规支持、数字营销等多维度的扶持助力</div>
        <div class="joinBtn disfr ac jc cursor" @click="goJoin">申请加入</div>
      </div>
    </div>
    <div class="contecn">
     <img src="../assets/img/contentImg2x.png" alt="" class="contentImg">
     <div class="joinBtn disfr ac jc cursor" @click="goJoin">立即加入</div>
    </div>
    <div class="footerBox fc ac jc">
      <span class="color3 fw5 titleName">期待您的加入</span>
      <div class="footerContent">欢迎您加入耀火计划， 您随时可以联系我们：zhangxiyun@droi.com，也可点击下方按钮申请加入或查看您的报名。</div>
      <div class="joinBtn disfr ac jc cursor" @click="goJoin">立即加入</div>
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
  background-image: url("../assets/img/kv2x.png");
  background-size: 100% 100%;
  width: 100%;
  min-width: 940px;
  height: 490px;
  .topBox_content{
    width: 940px;
    margin-top: 132px;
    .title{
      font-size: 40px;
      font-weight: 700;
      color: #333333;
      line-height: 47px;
    }
    .topBox_content_text{
      width: 800px;
      font-size: 16px;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      margin: 12px 0 40px;
    }
 
  }
}
.contecn{
margin: 0 auto;
width: 940px;
.contentImg{
width: 940px;
height: 967px;
margin: 60px 0 20px;
}
// .titleName{
//   margin: 60px 0 40px;
//   font-size: 36px;
//   .underline{
//     border-bottom: 2px solid #80AAFF;
//   }
// }
}
.footerBox{
  width: 100%;
  min-width: 940px;
  height: 400px;
  margin-top: 154px;
  background-image: url("../assets/img/footImg2x.png");
  .titleName{
    font-size: 36px;
  }
  .footerContent{
   margin: 40px 0; 
   width: 720px;
  }
}
.joinBtn{
  width: 120px;
  height: 40px;
  background: #333333;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
}
</style>
