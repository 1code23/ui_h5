<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

import { List } from "../assets/data";

const getAssetsFile = (id) => {
  return new URL(`../assets/images/theme${id}.png`, import.meta.url).href;
};

const navToDetail = (id) => {
  router.push({
    name: "detail",
    query: {
      id,
    },
  });
};
</script>


<template>
  <div class="home">
    <ul class="list">
      <li @click="navToDetail(item.id)" v-for="item in List" :key="item.id">
        <img :src="getAssetsFile(item.id)" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.price }}</p>
      </li>
    </ul>
  </div>
</template>



<style lang="scss">
.home {
  margin-top: 24px;
  box-sizing: border-box;
  padding: 0 32px;
  overflow-y: scroll;

  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
  }

  img {
    width: 202px;
    border-radius: 16px 16px 16px 16px;
    margin-right: 10px;
  }

  h3 {
    font-size: 28px;
  }

  p {
    font-size: 24px;
    color: #808080;
  }
}
</style>