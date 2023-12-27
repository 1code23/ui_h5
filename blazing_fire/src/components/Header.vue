<template>
  <div class="headerBox disfr ac jc">
   <div class="imgBox disfr ac">
    <img src="../assets/img/logo2x.png" alt="" class="iconImg mr10">
    <span>耀火计划</span>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
			return {
				
			}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.headerBox{
width: 100%;
min-width: 940px;
height: 74px;
background: #000000;
border-radius: 0px 0px 0px 0px;
opacity: 0.5;
.imgBox{
  width: 940px;
  // width: 100%;
}
.iconImg{
width: 24px;
height: 24px;
}
span{
  font-size: 14px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 16px;
}
}
</style>
