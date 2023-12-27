<template>
  <div>
    <div class="home">
      <div class="bannerArea">
        <img src="@/assets/imgs/img01.jpg" alt="" />
      </div>
      <div class="contentWrapper">
        <div class="part1">
          <div class="part1Text">
            {{ detailData.start ? (isActive ? "活动中" : "已结束") : "未开始" }}
          </div>
          <div>活动结束时间：2023年5月5日 00：00</div>
        </div>
        <div class="part2">
          <div class="titleText">卓易节庆赠礼</div>
          <div class="part2Card">
            <div class="giftIcon"></div>
            <div class="giftInfo">
              <div class="giftTitle">下载领好礼</div>
              <div class="giftDesc">礼包内容：游侠法师 拉克丝皮肤臻享卡</div>
              <!-- <div>剩余 {{ detailData.cardCount }} 件</div> -->
            </div>
            <div class="part2Footer">
              <div
                v-if="detailData.getOk == 1"
                class="part2FooterBtn"
                @click="getAward()"
              >
                领取
              </div>
              <div v-else class="part2FooterBtn" style="opacity: 0.3">
                {{ detailData.getOk == 2 ? "已领取" : "不可领取" }}
              </div>
              <!-- <div>还差 {{ detailData.getDayNum }} 天</div> -->
            </div>
          </div>
        </div>
        <div class="part3">
          <div class="titleText">活动说明</div>
          <div class="part3Content">
            <p>1.活动时间：4.28 00:00-5月5日 00:00</p>
            <p>2.活动规则：通过活动页进入游戏页面完成下载后获得口令码；</p>
            <p>3.领取方式：游戏主页-微社区-福利中输入对应口令码获取奖励；</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <div  @click="handleGifts" class="footerLeft">
          <div class="footerLeftImg">
            <img src="@/assets/imgs/icon_me.png" alt="" />
          </div>
          <div>我的礼包</div>
        </div>

        <div class="footerRight" @click="signIn()" v-if="detailData.getOk == 0">
          前往详情页下载
        </div>
        <div class="footerRight signed" style="" v-else>可领取礼包</div>
      </div>
    </div>
    <!-- 底部弹出 -->
    <van-popup
      v-model:show="showGifts"
      position="bottom"
      style="min-height: 30%"
      class="myPopup"
    >
      <div class="myGiftArea">
        <div class="giftHeader">我的礼包</div>
        <div class="giftList" v-if="cardList.length">
          <div class="giftItem" v-for="(item, index) in cardList" :key="index">
            <div class="giftIcon"></div>
            <div class="giftInfo">
              <div class="giftTitle">下载领好礼</div>
              <div class="giftDesc">礼包内容：游侠法师 拉克丝皮肤臻享卡</div>
              <div>2023年5月5日 00：00前有效</div>
            </div>
            <div class="itemRight">
              <div @click="copyData(item.cardId)" style="margin-right:4px">
                <img src="@/assets/imgs/icon_copy.png" alt="" />复制
              </div>
              <div class="cardId">{{ item.cardId }}</div>
            </div>
          </div>
        </div>
        <div v-else class="emptyCart">
          <img src="@/assets/imgs/img_empty.png" alt="" />
          <div>成功领取后的礼包显示在这里哦</div>
        </div>
      </div>
    </van-popup>
    <!-- 底部弹出 -->
    <van-popup v-model:show="showSuccess" position="bottom" class="myPopup">
      <div class="msgArea">
        <div class="title">领取成功</div>
        <div class="desc">
          <p>
            本次活动口令码为“{{
              cardId
            }}”，请前往游戏主页-微社区-福利中输入对应口令码获取奖励点击“复制兑换码”后可复制本次口令。
          </p>
        </div>
        <div class="copyBtn" @click="copyData(cardId)">复制兑换码</div>
      </div>
    </van-popup>
    <van-popup
      v-model:show="showNotChipId"
      :close-on-click-overlay="false"
      position="bottom"
      class="myPopup"
    >
      <div class="msgArea">
        <div class="title">提示</div>
        <div class="desc" style="padding-bottom: 60px">
          此次活动仅Freeme OS用户可参加
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  showLoadingToast,
  closeToast,
  showSuccessToast,
  showFailToast,
} from "vant";
import { getActivityInfo, getAward, signIn } from "@/common/api.js";
export default defineComponent({
  name: "HomeView",
  created() {
    this.getActivityInfo();
  },
  data() {
    return {
      chipId: "", // 设备的chipId
      showGifts: false, // 我的礼包弹框
      showSuccess: false, // 领取成功弹框
      showNotChipId: false,
      myPopupStyle: {
        minHeight: "30%",
      },
      detailData: {
        cardCount: 0,
        getDayNum: 0,
        getOk: 0, //0不可领取 1可领取 2已领取
        todaySign: false, //今天是否已签到
        start: true,
      },
      cardList: [],
      cardId: "", // 领取成功后的兑换码
    };
  },
  computed: {
    isActive() {
      // 是否活动中
      return new Date().getTime() < new Date("2023-05-05 00:00:00").getTime();
    },
  },
  methods: {
    handleGifts() {
      this.showGifts = true;
    },
    async getActivityInfo() {
      const deviceId = this.getChipId();
      if (!deviceId) {
        return false;
      }

      const res = await getActivityInfo({ deviceId: "lol_" + deviceId });
      if (res.code == 0) {
        const { cardList, ...rest } = res.data;
        this.detailData = rest;
        this.cardList = cardList;
      }
    },
    // 领取奖励
    async getAward() {
      const res = await getAward({ deviceId: "lol_" + this.chipId });
      if (res.code == 0) {
        showSuccessToast("操作成功");
        this.cardId = res.data.cardId;
        this.getActivityInfo();
        this.showSuccess = true;
      } else if (res.code == 6) {
        showSuccessToast("活动还未开始");
      }
    },
    // 签到
    async signIn() {
      showLoadingToast({
        message: "加载中...",
        forbidClick: true,
      });
      const res = await signIn({ deviceId: "lol_" + this.chipId });
      closeToast();

      if (res.code == 0) {
        // showSuccessToast("操作成功");
        location.href =
          "market://details?id=com.tencent.lolm&adType=1&auto_download=true&appName=英雄联盟手游";
        this.getActivityInfo();
      } else if (res.code == 6) {
        showSuccessToast("活动还未开始");
      }
    },
    getChipId() {
      // this.chipId = "2222";
      let chipId = this.chipId;
      if (!chipId) {
        if (window.zhuoyou_login) {
          chipId = JSON.parse(
            window.zhuoyou_login.zhuoyou_get_marketInfo()
          ).chipId;
        }
        this.chipId = chipId;
      }
      if (!chipId) {
        this.showNotChipId = true;
      }
      return chipId;
    },
    copyData(value: any) {
      const input = document.createElement("input"); // 创建input对象
      input.value = value; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      showSuccessToast("复制成功");
    },
  },
});
</script>
<style scoped lang="less">
.giftIcon {
  width: 50px;
  height: 50px;
  background: #f8f8f8 url("~@/assets/imgs/icon_gift.png") no-repeat center;
  background-size: 33px 33px;
  border-radius: 6px;
}

.giftInfo {
  flex: 1;
  margin: 0px 10px;
  overflow: hidden;
}

.giftTitle {
  font-weight: 600;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
}

.giftDesc {
  margin: 5px 0px;
  line-height: 14px;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  // box-sizing: border-box;
}

.home {
  background-color: #2c2128;
  min-height: 100vh;
  color: #fff;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;

  img {
    width: 100%;
  }

  .contentWrapper {
    padding: 15px;

    .part1 {
      .part1Text {
        font-size: 14px;
        display: inline-block;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 14px;
        margin-bottom: 6px;
        font-weight: 600;
      }
    }

    .titleText {
      margin-top: 20px;
      font-size: 16px;
      font-weight: 600;
    }

    .part2 {
      .part2Card {
        background-color: #fff;
        color: #999;
        border-radius: 8px;
        margin-top: 12px;
        padding: 12px 10px 12px 10px;
        display: flex;
        align-items: center;
      }

      .part2Footer {
        text-align: center;
      }

      .part2FooterBtn {
        text-align: center;
        background: #00c2d2;
        border-radius: 15px;
        font-size: 14px;
        color: #ffffff;
        font-weight: 600;
        margin-bottom: 5px;
        padding: 8px 21px;
      }
    }

    .part3 {
      .part3Content {
        margin-top: 7px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 18px;
        padding-bottom: 200px;
      }
    }
  }

  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    background: #20181d;
    padding: 16px 24px 20px 38px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;

    .footerLeft {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      .footerLeftImg {
        width: 26px;
        height: 26px;
        padding-bottom: 4px;
      }
    }

    .footerRight {
      width: 220px;
      background: #00c2d2;
      border-radius: 20px;
      font-size: 16px;
      text-align: center;
      box-sizing: border-box;
      padding: 12px 5px;
    }

    .footerRight.signed {
      background: rgba(0, 194, 210, 0.3);
    }
  }
}

.myGiftArea {
  .giftHeader {
    font-size: 17px;
    color: rgba(0, 0, 0, 0.9);
    text-align: center;
    padding: 20px 12px 12px;
  }

  .giftList {
    padding-bottom: 26px;

    .giftItem {
      display: flex;
      color: #999;
      font-size: 12px;
      align-items: center;
      padding: 12px 10px 10px 9px;
    }

    .itemRight {
      color: #00c2d2;
      text-align: end;

      img {
        width: 12px;
        height: 12px;
        margin-right: 4px;
      }

      .cardId {
        background: #ebfbfc;
        border-radius: 7px;
        padding: 3px 4px;
        margin-top: 4px;
        max-width: 60px;
        display: -webkit-box;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        text-align: center;
      }
    }
  }

  .emptyCart {
    padding: 37px 5px 49px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.38);
    font-size: 12px;

    img {
      width: 110px;
      height: 110px;
      margin-bottom: 12px;
    }
  }
}

.msgArea {
  .title {
    font-size: 17px;
    line-height: 24px;
    padding: 24px 24px 12px;
    color: rgba(0, 0, 0, 0.9);
  }

  .desc {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.6);
    padding: 0px 24px 16px;
    line-height: 21px;
  }

  .copyBtn {
    border: 1px solid rgba(153, 153, 153, 0.15);
    padding: 17px 0px;
    color: #00c2d2;
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
