<script setup>
import { ref, onUpdated } from "vue";

const apkInfo = ref({});
const downStatus = ref("");
const progress = ref("");
const empty = ref(null);

const paddingTop = ref(0);
const contentTop = ref(0);
const section = ref(null);

window.zhuoyi_market?.getAppDetailData();

const padTop = window.zhuoyi_market?.getStatusBarHeight();
if (padTop) {
  paddingTop.value = (padTop / 3).toFixed(2);
}

onUpdated(() => {
  contentTop.value = section.value?.offsetHeight;
});

window["getAppDetailData"] = (detail, status) => {
  try {
    if (detail == "null" || detail == null) {
      empty.value = true;
      return;
    }
    const jsonDetail = JSON.parse(detail);
    const jsonStatus = JSON.parse(status);

    console.log(jsonDetail, jsonStatus, "getAppDetailData");

    return getAppDetailData(jsonDetail, jsonStatus);
  } catch (error) {
    console.error(error);
  }
};

window["callBackAppDownStatus"] = (status) => {
  try {
    const jsonStatus = JSON.parse(status);

    console.log(jsonStatus, "callBackAppDownStatus");

    return setCurrentStatus(jsonStatus);
  } catch (error) {
    console.error(error);
  }
};

const getAppDetailData = (jsonDetail = {}, jsonStatus = {}) => {
  empty.value = false;

  if (jsonDetail.appType == 2 && jsonDetail.reserveTime) {
    const date = new Date(jsonDetail.reserveTime);
    var M =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    jsonDetail.reserveTime = `${M}月${D}日 首发`;
  }

  apkInfo.value = jsonDetail;

  document.title = jsonDetail.apkName;

  setCurrentStatus(jsonStatus);
};

const setCurrentStatus = (status) => {
  downStatus.value = status.downloadStatus;
  progress.value = status.progress;
};

const nativeNavigate = (evt) => {
  if (evt == "privacy") {
    window.zhuoyi_market?.startAppPrivacyAgreement();
  } else if (evt == "permission") {
    window.zhuoyi_market?.startAppPermissionDetail();
  } else if (evt == "desc") {
    window.zhuoyi_market?.startAppDescDialog();
  }
};

const clickAppButton = () => {
  window.zhuoyi_market?.clickAppButton();
};
</script>

<template>
  <main class="main">
    <div v-if="empty">
      <h6>该应用不存在</h6>
    </div>
    <div v-else-if="empty == false">
      <div
        class="section_2_out"
        :class="{ need_pad: paddingTop > 0 }"
        ref="section"
        :style="{ paddingTop: paddingTop + 'px' }"
      >
        <div class="section_2">
          <div class="text-group_4">
            <span class="text_5">应用：{{ apkInfo.apkName }}</span>
            <span v-if="apkInfo.company" class="text_5 text_6"
              >开发商：{{ apkInfo.company }}</span
            >
          </div>
          <div class="text-group_5">
            <span class="text_7" v-if="apkInfo.verName"
              >版本：{{ apkInfo.verName }}</span
            >
            <span class="text_8"
              ><span
                v-if="apkInfo.appType != 2"
                @click="nativeNavigate('privacy')"
                >隐私 |
              </span>
              <span
                v-if="apkInfo.appType != 2"
                @click="nativeNavigate('permission')"
                >权限 |
              </span>
              <span @click="nativeNavigate('desc')">应用介绍</span></span
            >
          </div>
        </div>
      </div>

      <div class="box_1">
        <div class="image-text_2">
          <img :src="apkInfo.iconUrl" class="box_2" alt="" />

          <div class="text-group_6">
            <span class="text_13">{{ apkInfo.apkName }}</span>

            <div v-if="apkInfo.appType == 2">
              <div class="tag_1 tag_3" v-if="apkInfo.reserveTime">
                <span class="tag_2">预约</span>{{ apkInfo.reserveTime }}
              </div>
              <div class="tag_1" v-else>
                <span class="tag_2">预约</span>敬请期待
              </div>
            </div>
            <span v-else class="text_14">{{ apkInfo.desc }}</span>
          </div>
        </div>
        <button
          @click="clickAppButton"
          class="button_1"
          :class="{
            greyBtn:
              downStatus == 12 &&
              apkInfo.marketSelfVer != 429 &&
              apkInfo.marketSelfVer != 2069,
          }"
        >
          <span class="text_15">
            {{
              downStatus == 0
                ? "下载"
                : downStatus == 1 || downStatus == 2
                ? progress
                : downStatus == 3 || downStatus == 4
                ? "继续"
                : downStatus == 5 || downStatus == 8
                ? "安装"
                : downStatus == 6
                ? "安装中"
                : downStatus == 7
                ? "打开"
                : downStatus == 10
                ? "等待"
                : downStatus == 11
                ? "预约"
                : downStatus == 12
                ? "已预约"
                : ""
            }}
          </span>
        </button>
      </div>

      <div class="ymzx" v-if="apkInfo.apkName.indexOf('我自为道') > -1">
        <img
          src="@/assets/images/bg2.png"
          class="block_5"
          :style="{ marginTop: contentTop + 'px' }"
          alt=""
        />
      </div>
      <div class="ymzx" v-else-if="apkInfo.apkName.indexOf('元梦之星') > -1">
        <img
          src="@/assets/images/bg.png"
          class="block_5"
          :style="{ marginTop: contentTop + 'px' }"
          alt=""
        />
      </div>
      <div v-else>
        <img
          src="@/assets/images/banner.png"
          class="block_5"
          :style="{ marginTop: contentTop + 'px' }"
          alt=""
        />
        <div class="block_6">
          <span class="text_9">光灵羁绊，多元策略</span>
          <div class="box_5">
            <div class="section_3"></div>
            <div class="text-wrapper_2">
              <span class="text_10">关键词：RPG、策略、模拟人生</span>
              <span class="text_11">一句话推荐：由你创造的光与暗的故事</span>
            </div>
          </div>
          <span class="text_12"
            >《斗罗大陆》是一款IP正版授权的沉浸式策略手游，登录即送免费VIP，亿万魂师的不二选择，IP正版授权巨作《斗罗大陆》带你重铸唐门辉煌！原著场景真实还原，全新互动式小说体验，量身打造专属斗罗世界！<br /><br />立即加入史莱克，决战武魂殿！携手七怪征战星斗大森林，狩猎魂兽收集强大魂环；争霸斗魂场，角逐魂师无上荣耀；激战杀戮之都、通关海神九考，继承神祇之位！马上进入斗罗大陆，振兴唐门辉煌！</span
          >
        </div>
      </div>
    </div>
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
  padding-bottom: 38px;
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
  align-items: center;

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
  flex-shrink: 0;
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
  flex-shrink: 0;
  min-width: 112px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
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
