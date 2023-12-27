<template>
  <div>
    <div v-if="isMobile"><router-view/></div>
    <div v-else><router-view/></div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isMobile: false
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import "~@/common/css/common.scss"; // 全局公共css
html,body {
display:block;
margin: 0;
padding: 0;
// font-size: 67.5%;
}
#app {
height: 100vh;
width: 100%;
margin: 0;
padding: 0;
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
color: #2c3e50;
}

html {
  margin: auto;
  height: 100%;
  font-size: calc(100vw/7.2); 
  font-size: -webkit-calc(100vw/7.2); 
  -webkit-text-size-adjust: 100%; 
}
body {
  font-size: .14rem;
  height: 100%;
}



// html body {margin: 0; padding: 0;}
// html {
//   margin: auto;
//   max-width: 750px;
//   height: 100%;
//   font-size: calc(100vw/7.5); 
//   font-size: -webkit-calc(100vw/7.5); 
//   -webkit-text-size-adjust: 100%; 
// }
// body {
//   font-size: .14rem;
//   height: 100%;
// }
// @media screen and (min-width: 751px) {
//    html { 
//      font-size: 75px; -webkit-text-size-adjust: 100%; 
//    } 
// }
</style>
