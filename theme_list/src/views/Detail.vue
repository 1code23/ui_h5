<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import { List } from "../assets/data";

const obj = ref({});

if (route.query.id) obj.value = List.find((item) => item.id == route.query.id);

const navToPay = () => {
  router.push({
    name: "pay",
    query: {
      id: obj.value.id,
    },
  });
};

const getAssetsFile = (id) => {
  return new URL(`../assets/images/theme${id}.png`, import.meta.url).href;
};
</script>


<template>
  <div class="detail">
    <img :src="getAssetsFile(obj.id)" />
    <div class="info">
      <h3>{{ obj.title }}</h3>
      <p>3.1MB｜作者：UED</p>
    </div>

    <div class="btn_pay" @click="navToPay">
      <span>{{ obj.price }}购买主题</span>
    </div>
  </div>
</template>


<style lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  .info {
    width: 640px;
    padding: 32px 0;
    margin-bottom: 60px;
  }
  img {
    width: 640px;
    margin-top: 32px;
  }
  h3 {
    font-size: 36px;
  }
  p {
    font-size: 26px;
    color: #999999;
  }
}
</style>