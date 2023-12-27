<script setup>
import { ref } from "vue";

const products = ref([]);
const deepLink = ref("");
const loading = ref(false);

// const api = "http://10.20.70.127:8089";
const api = "https://clog-market.yy845.com";

fetch(
  `${api}/activity/goods/list?title=${getUrlKey(
    "title"
  )}&page=&page_size=&price_min=${getUrlKey("price_min")}&price_max=${getUrlKey(
    "price_max"
  )}&sell_num_min=${getUrlKey("sell_num_min")}&sell_num_max=${getUrlKey(
    "sell_num_max"
  )}&order_type=${getUrlKey("order_type")}`
)
  .then((res) => res.json())
  .then((json) => {
    products.value = json.data.products;
    deepLink.value = json.data.deepLink;
  })
  .catch((err) => {
    console.log(err);
  });

function getUrlKey(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        window.location.href
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || ""
  );
}

function getDyDeepLink(item, index) {
  loading.value = true;
  fetch(
    `${api}/activity/goods/link?detail_url=${encodeURIComponent(
      item.detail_url
    )}&ext=${encodeURIComponent(item.ext)}`
  )
    .then((res) => res.json())
    .then((json) => {
      loading.value = false;

      products.value[index].dyLink = json.dyLink;
      window.location.href = json.dyLink;
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
    });
}

function navToDetail(item, index) {
  // 使用卓易市场抖音 并且 没有安装抖音
  let no_douyin;
  if (window.ride_wind) {
    no_douyin = window.ride_wind.isNoDouYin();
  } else {
    no_douyin = getUrlKey("no_douyin");
  }

  if (no_douyin == 1) {
    // 没有安装抖音
    if (getUrlKey("zy_douyin") == 1) {
      // 跳转市场deeplink
      window.location.href = deepLink.value;
    } else {
      // 跳转外部抖音详情页
      window.location.href = item.detail_url;
    }
  } else if (no_douyin == 0) {
    // 安装了抖音
    if (item.dyLink) window.location.href = item.dyLink;
    else getDyDeepLink(item, index);
  } else {
    window.location.href = item.detail_url;
  }
}
</script>

<template>
  <div class="list">
    <div
      @click="navToDetail(item, index)"
      class="sp-goods-item"
      v-for="(item, index) in products"
    >
      <div class="sp-image goods-item__hd">
        <img :src="item.cover" />
      </div>
      <div class="goods-item__bd">
        <div class="goods-title">{{ item.title }}</div>
        <div class="goods__store">已售{{ item.sales }}件</div>
        <div class="bd-block">
          <div class="goods-price"><span>￥</span>{{ item.price / 100 }}</div>
          <img class="buy" src="./assets/images/buy@2x.png" alt="" />
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">
      <div class="sp-loading">
        <span className="sp-loading-text">加载中...</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-hint-text: #999 !default;

@mixin multi-ellipsis($line) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $line;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.list {
  width: 680px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.sp-goods-item {
  width: 332px;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  padding-bottom: 16px;
  margin-top: 16px;

  .goods-item {
    &__hd {
      width: 100%;
      height: 332px;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 52px;
        height: 36px;
        background-image: url(./assets/images/ad_tag@2x.png);
        background-size: 100% 100%;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px 16px 0px 0px;
      }
    }

    &__bd {
      border-radius: 0;
      padding: 16px 16px 0;

      .goods-title {
        font-size: 28px;
        color: #333333;
        font-weight: bold;
        @include multi-ellipsis(2);
        line-height: 40px;
      }

      .bd-block {
        display: flex;
        justify-content: space-between;

        .goods-price {
          font-size: 36px;
          color: #f02200;

          span {
            font-size: 24px;
          }
        }

        .buy {
          width: 76px;
          height: 40px;
        }
      }
    }
  }

  .goods__store {
    font-size: 24px;
    color: $color-hint-text;
    padding-top: 16px;
  }
}

.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
}

.sp-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  &-text {
    margin-left: 10px;
    font-size: 24px;
    color: #eee;
  }
}
</style>
