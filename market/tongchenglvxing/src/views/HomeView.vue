<script setup>
import { ref } from "vue";
import { showToast, Dialog } from 'vant';

const resultModal = ref(false);
const show = ref(false);
const isSelect = ref(false);
const phoneVal = ref('')

const setCheckStatus = () => {
  isSelect.value = !isSelect.value
}

const showGetModal = () => {
  if (!isSelect.value) {
    showToast('请阅读协议后勾选');
    return;
  }

  show.value = true;
}

const checkPhone = () => {
  const val = phoneVal.value.trim();
  if (val === "") {
    showToast('请输入手机号');
    return;
  }
  const regPhone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  if (!regPhone.test(val)) {
    showToast('请输入正确的手机号');
    return;
  }

  show.value = false;
  resultModal.value = true;
}

const useDirect = () => {
  resultModal.value = false;
}

</script>

<template>
  <main class="main">
    <div class="banner bg">
      <img src="@/assets/images/title1.png" class="title" alt="" />
      <img src="@/assets/images/redpacket.png" class="redpacket" alt="" />

      <button class="btn_get" @click="showGetModal"></button>
      <div class="checkbox">
        <span @click="setCheckStatus"><span class="iconfont"
            :class="isSelect ? 'icon-danxuan' : 'icon-danxuankuang'"></span>
          <span>我已阅读并同意</span></span>
        <a href="#" class="link">《个人信息使用授权书》</a>
      </div>
    </div>

    <div class="bg">
      <img src="@/assets/images/title2.png" class="title" alt="">
      <img src="@/assets/images/icon.png" class="icon" alt="">
    </div>

    <div class="bg">
      <img src="@/assets/images/title3.png" class="title" alt="">

      <div class="rules">
        <p>
          1、领取后请在7日内至同程旅行APP/小程序登录使用，过期未登录，将无法正常使用;
        </p>
        <p>
          2、领取的代金券面额、种类及使用有效期限，以实际领取结果为准;
        </p>
        <p>
          3、单次预订产品时仅限使用一张，具体使用规则详见代金券列表详情说明;
        </p>
        <p>
          4、代金券使用规则查看路径: 同程旅行APP/小程序-我的红包优惠券;
        </p>
        <p>
          5、如有其他疑问可咨询同程旅行客服电话: 95711;
        </p>
        <p>
          6、每日可领取的数量有限，先到先得; 领取后的7日后可再次领取。
        </p>
      </div>
    </div>

    <img src="@/assets/images/bottom.png" class="bottom" alt="">

    <Dialog v-model:show="show" :showConfirmButton="false" className="inputDialog">
      <div class="icon_outter" @click="show = false"><span class="iconfont icon-guanbi"></span></div>
      <input type="text" class="ipt" placeholder="输入手机号领券" v-model="phoneVal">
      <button class="btn_get  get1" @click="checkPhone"></button>
    </Dialog>

    <Dialog v-model:show="resultModal" :showConfirmButton="false" className="resultDialog">
      <div class="use_bg">
        <img src="@/assets/images/sorry.png" class="draw_result" alt="">
        <div class="use_outter">
          <button class="btn_get  use" @click="useDirect"></button>
        </div>
        <div class="close_outter" @click="resultModal = false"><span class="iconfont icon-guanbi1"></span></div>
      </div>
    </Dialog>

  </main>
</template>

<style lang="scss">
.main {
  position: relative;
  animation-duration: 0.6s;
  animation-fill-mode: both;
  animation-name: fadeIn;
  background-repeat: no-repeat;
  background-size: 100% 798px;
  background-image: url(@/assets/images/banner.png);

  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bg {
    width: 656px;
    background: #FFFFFF;
    box-shadow: 0px 8px 20px 0px #B4C5EB;
    border-radius: 48px 48px 48px 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 66px;
    padding-bottom: 50px;
  }

  .banner {
    margin-top: 426px;

    .redpacket {
      width: 656px;
      height: 480px;
      margin-top: 20px;
    }

    .checkbox {
      font-size: 24px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #3D3D3D;
      line-height: 34px;
      -webkit-background-clip: text;

      .iconfont {
        font-size: 30px;
        margin-right: 5px;
      }
    }
  }

  .icon {
    width: 564px;
    height: 148px;
  }

  .title {
    width: 534px;
    height: 124px;
    margin-top: -30px;
  }

  .rules {
    width: 564px;
    font-size: 28px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #3D3D3D;
    line-height: 44px;

    p {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .bottom {
    width: 199px;
    height: 60px;
    margin-top: 48px;
    margin-bottom: 48px;
  }

  .btn_get {
    width: 548px;
    height: 114px;
    background-size: 100% 100%;
    background-image: url(@/assets/images/btn_get.png);
    border-width: 0;
    background-color: transparent;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .get1 {
    width: 636px;
    height: 100px;
    background-image: url(@/assets/images/btn_get1.png);
  }

  .ipt {
    width: 636px;
    height: 100px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 50px;
    border-width: 0;
    font-size: 32px;
    margin-bottom: 20px;
    padding-left: 40px;
    letter-spacing: 1px;
  }

  .inputDialog {
    width: 100%;

    .van-dialog__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0 40px;

      .icon_outter {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }

      .iconfont {
        font-size: 56px;
        color: #aaa;
        margin-right: 20px;
        margin-bottom: 20px;
      }
    }
  }

  .resultDialog {
    width: 100%;
    max-width: 100%;
    background-color: transparent;

    .use_bg {
      width: 720px;
      height: 856px;
      background-size: 100% 100%;
      background-image: url(@/assets/images/modal.png);
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .draw_result {
      width: 392px;
      height: 127px;
      margin-bottom: 120px;
    }

    .use_outter {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 190px;
      display: flex;
      justify-content: center;
    }

    .use {
      width: 320px;
      height: 92px;
      background-image: url(@/assets/images/btn_use.png);
    }

    .close_outter {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 30px;
      display: flex;
      justify-content: center;

      .iconfont {
        font-size: 72px;
        color: #FFFFFF;
      }
    }
  }
}
</style>
