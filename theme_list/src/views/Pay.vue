<script setup>
import { ref } from "vue";
import { showToast } from "vant";
import { useRoute } from "vue-router";
import { List } from "../assets/data";

const route = useRoute();
const checked = ref(1);
const obj = ref({});

if (route.query.id) obj.value = List.find((item) => item.id == route.query.id);

const notOpen = () => {
  showToast({
    message: "微信支付未开通",
    position: "bottom",
  });
};
</script>


<template>
  <div class="pay">
    <div>
      <div class="pay_top">
        <h6 class="title">{{ obj.title }}</h6>
        <h2 class="price">{{ obj.price }}</h2>
      </div>

      <van-radio-group v-model="checked">
        <van-radio :name="1" label-position="left">
          <img
            src="@/assets/images/ic_wechatpay@2x.png"
            class="wechat"
            alt=""
          />
          <span class="wechat_title">微信</span>
        </van-radio>
      </van-radio-group>
    </div>

    <div class="btn_pay" @click="notOpen">
      <span>确认支付{{ obj.price }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.van-radio {
  width: 640px;
  background: #ffffff;
  border-radius: 32px 32px 32px 32px;
  padding: 0 36px;
  box-sizing: border-box;
  height: 144px;
}

.van-radio__label--left {
  flex: 1;
  display: flex;
  align-items: center;
}
.pay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background-color: rgba(240, 241, 242, 1);

  .pay_top {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: normal;
  }
  .price {
    font-size: 56px;
    margin-bottom: 60px;
  }

  .wechat {
    width: 64px;
    height: 64px;
  }
  .wechat_title {
    font-size: 32px;
    font-weight: bold;
    margin-left: 10px;
  }
}
</style>