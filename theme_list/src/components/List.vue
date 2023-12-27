<script setup>
import { getGoodsLink } from "../utils/req";

defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const navToDetail = async (item) => {
  const { data: goodsItem } = await getGoodsLink(item.id, {
    searchId: item.searchId,
    pId: item.id,
  });
  location.href = goodsItem.data.url;
};
</script>

<template>
  <div class="list">
    <div
      @click="navToDetail(item, idx)"
      class="sp-goods-item"
      v-for="(item, idx) in items"
      :key="idx"
    >
      <div class="sp-image goods-item__hd">
        <img :src="item.imgUrl" />
      </div>
      <div class="goods-item__bd">
        <div class="goods-title">{{ item.name }}</div>
        <div>
          <span class="goods-price"><span>￥</span>{{ item.price }}</span>
          <span class="goods__store">已拼{{ item.salesTip }}件</span>
        </div>
      </div>
    </div>
  </div>
</template>