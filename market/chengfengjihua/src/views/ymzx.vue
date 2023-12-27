<script setup>
import { ref } from "vue";

const apkInfo = ref({
  apkName: "元梦之星",
  company: "深圳市腾讯计算机系统有限公司",
});

const paddingTop = ref(0);
const contentTop = ref(0);
const section = ref(null);

const padTop = window.zhuoyi_market?.getStatusBarHeight();
if (padTop) {
  paddingTop.value = (padTop / 3).toFixed(2);
}

contentTop.value = section.value?.offsetHeight;
</script>

<template>
  <main class="main">
    <div
      class="section_2_out"
      :class="{ need_pad: paddingTop > 0 }"
      :ref="section"
      :style="{ paddingTop: paddingTop + 'px' }"
    >
      <div class="section_2">
        <div class="text-group_4">
          <span class="text_5">应用：{{ apkInfo.apkName }}</span>
          <span v-if="apkInfo.company" class="text_5 text_6"
            >开发商：{{ apkInfo.company }}</span
          >
        </div>
        <div class="text-group_5"></div>
      </div>
    </div>
    <img
      src="@/assets/images/bg.png"
      class="block_5"
      :style="{ marginTop: contentTop + 'px' }"
      alt=""
    />
  </main>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
  animation-duration: 0.6s;
  animation-fill-mode: both;
  animation-name: fadeIn;

  width: 750px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.section_2_out {
  width: 750px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: flex-end;
  box-sizing: content-box;
  height: 100px;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
}
.need_pad {
  height: 128px;
}
.section_2 {
  width: 750px;
  height: 100px;
  box-sizing: content-box;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-group_4 {
  display: flex;
  flex-direction: column;
  width: 415px;
  overflow: hidden;
  margin-left: 38px;
}
.text_5 {
  overflow-wrap: break-word;
  color: rgba(148, 149, 155, 1);
  font-size: 19px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 27px;
}
.text_6 {
  margin: 8px 19px 0 0;
}
.text-group_5 {
  display: flex;
  flex-direction: column;
  margin-right: 38px;
}
.text_7 {
  overflow-wrap: break-word;
  color: rgba(148, 149, 155, 1);
  font-size: 19px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
  line-height: 27px;
  margin-left: 46px;
}
.text_8 {
  height: 27px;
  overflow-wrap: break-word;
  color: rgba(23, 102, 226, 1);
  font-size: 19px;
  font-family: HarmonyOS_Sans_Medium;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 25px;
  margin-top: 8px;
}
.ymzx {
  padding-bottom: 100px;
}
.block_5 {
  width: 750px;
  margin-top: -2px;
  display: flex;
  flex-direction: column;
}

.block_6 {
  background-color: rgba(32, 50, 112, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 58px 58px 277px 50px;
}
.text_9 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 42px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 58px;
  margin-right: 267px;
}
.box_5 {
  width: 444px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 17px 198px 0 0;
}
.section_3 {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  width: 4px;
  height: 71px;
  display: flex;
  flex-direction: column;
  margin: 6px 0 2px 0;
}
.text-wrapper_2 {
  display: flex;
  flex-direction: column;
}
.text_10 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 25px;
  font-family: PingFangSC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 35px;
  margin-right: 73px;
}
.text_11 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 25px;
  font-family: PingFangSC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 35px;
  margin-top: 8px;
}
.text_12 {
  width: 642px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 29px;
  font-family: PingFangSC-Regular;
  font-weight: normal;
  text-align: left;
  line-height: 42px;
  margin-top: 60px;
}
.box_1 {
  background-color: rgba(255, 255, 255, 1);
  width: 750px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  padding: 33px 42px 31px 42px;

  border-radius: 25px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
}
.image-text_2 {
  width: 515px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.box_2 {
  border-radius: 17px;
  width: 81px;
  height: 81px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-right: 10px;
}
.text-group_6 {
  display: flex;
  flex-direction: column;
  max-width: 415px;
}
.text_13 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.9);
  font-size: 31px;
  font-family: PingFangSC-Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44px;
  margin-right: 296px;
}
.text_14 {
  overflow-wrap: break-word;
  color: rgba(148, 149, 155, 1);
  font-size: 25px;
  font-family: PingFangSC-Regular;
  font-weight: normal;
  text-align: left;
  line-height: 35px;
  margin-top: 2px;

  display: -webkit-box;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}
.tag_1 {
  padding-right: 10px;
  border-radius: 4px;
  border: 2px solid rgba(5, 121, 246, 0.2);
  margin-top: 4px;
  flex-direction: row;
  display: inline-flex;
  align-items: center;
  text-wrap: nowrap;
  font-size: 20px;
  color: #0579f6;
  line-height: 30px;
  .tag_2 {
    padding: 0 10px;
    background: rgba(5, 121, 246, 0.2);
    margin-right: 10px;
  }
}

.button_1 {
  border-radius: 28px;
  background-color: #fff;
  border: 2px solid #1766e2;
  display: flex;
  flex-direction: column;
  margin: 10px 0 13px 0;
  width: 112px;
  height: 56px;
  align-items: center;
  justify-content: center;
  .text_15 {
    overflow-wrap: break-word;
    color: rgba(23, 102, 226, 1);
    font-size: 27px;
    font-family: HarmonyOS_Sans_Medium;
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    line-height: 38px;
  }
}

.greyBtn {
  border-color: #bbbbbb;
  .text_15 {
    color: #bbbbbb;
  }
}
</style>
