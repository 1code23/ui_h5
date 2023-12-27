<template>
  <div class="headerBox disfr ac">
   <div class="disfr ac">
    <img src="../assets/img/Phome2x.png" alt="" class="iconImg">
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
// min-width: 940px;
height: 1.02rem;
background: #000000;
border-radius: 0rem;
opacity: 0.5;
.iconImg{
width: 0.36rem;
height: 0.34rem;
margin-left: 0.4rem;
}
// span{
//   font-size: 1.4rem;
//   font-weight: 400;
//   color: #FFFFFF;
//   line-height: 1.6rem;
// }
}
</style>
