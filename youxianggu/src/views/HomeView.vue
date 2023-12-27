<template>
  <div class="page flex-col justify-between">
      <div class="section_1 flex-col">
        <div class="image-wrapper_1 flex-row">
          <img
            class="image_1"
            referrerpolicy="no-referrer"
            src="../assets/home_page.png"
          />
        </div>
        <div class="group_1 flex-row justify-between">
          <div class="text-group_3 flex-col justify-between">
            <span class="text_1">公司简介</span>
            <span class="text_2"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;柚香谷生活服务类电商平台，致力于为用户提供高品质的生活服务和产品。我们的目标是通过创新的营销策略和卓越的客户体验，成为行业的领导者。</span
            >
          </div>
          <div class="box_1 flex-col">
            <div class="box_2 flex-col"></div>
            <span class="text_3">扫一扫进入柚香谷电商小程序</span>
          </div>
        </div>
      </div>
      <div class="section_2 flex-col">
        <div class="text-group_4 flex-col justify-between">
          <div class="text-wrapper_1">
            <span class="text_4">柚香谷电商平台-</span>
            <span class="text_5">专注于满足消费者对生活服务和产品的需求</span>
          </div>
          <div class="text_6"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们的产品包括美食、娱乐、健康、旅游等多个领域，通过深入了解目标市场和消费者需求，为用户提供个性化的服务和解决方案。</div
          >
        </div>
        <div class="box_5 flex-row justify-between">
          <div class="box_4 flex-col">
            <div class="text-wrapper_2 flex-col">
              <span class="text_7">美食</span>
            </div>
          </div>
          <div class="grid_2 flex-row">
            <div class="list-items_1-0 flex-col">
              <div class="text-wrapper_3 flex-col">
                <span class="text_8">娱乐</span>
              </div>
            </div>
            <div class="list-items_1-1 flex-col">
              <div class="text-wrapper_3 flex-col">
                <span class="text_8">健康</span>
              </div>
            </div>
            <div class="list-items_1-2 flex-col">
              <div class="text-wrapper_3 flex-col">
                <span class="text_8">旅游</span>
              </div>
            </div>
            <div class="list-items_1-3 flex-col">
              <div class="text-wrapper_3 flex-col">
                <span class="text_8">亲子</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-wrapper_4 flex-col">
        <span class="text_9"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司名称：上海柚香谷商贸有限公司&nbsp;<br v-if="this.ismobile">地址：上海市青浦区青安路382、384号126室</span
        >
        <span class="text_10">ICP备案号</span>
      </div>
    </div>
</template>

<script>
import "@/style/common.css"
export default {
  name: 'HomeView',
  components: {
  },
  data() {
			return {
				screenWidth:screen.width, // 屏幕宽度
        ismobile:false
			}
	},
  // 实时监控宽度
  watch: {
    screenWidth(val){
      this.screenWidth = val
    }
  },
  created () {
    // 当前页面允许双指缩放
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1')
    this.setClient()
  },
  // 定义一个方法
  methods: {
    setClient(){
      this.screenWidth = screen.width
      document.documentElement.style.fontSize = screen.width/10 + 'px'
      console.log(document.documentElement)
      if (this.screenWidth > 1280) {// 屏幕大小临界值，可根据自己需求修改
        import('@/style/index.css')
      } 
      else {
        this.ismobile = true
        import('@/style/indexRem.css')
      }
    },
  }
}

</script>
