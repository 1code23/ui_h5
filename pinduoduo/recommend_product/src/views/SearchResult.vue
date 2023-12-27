<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import IconUp from "../components/icons/IconUp.vue";
import IconDown from "../components/icons/IconDown.vue";

import { getSearchList } from "../utils/req";
import ListComp from "../components/List.vue";

const keywords = localStorage.getItem("keywords");

const router = useRouter();
const list = ref([
  {
    items: [],
    page: 0,
    refreshing: false,
    loading: false,
    error: false,
    finished: false,
  },
]);
/**
 * - price 价格
- sales 销量
- complex 综合
 */
const sortName = ref("complex");
const sortList = [
  { value: "complex", label: "综合" },
  { value: "sales", label: "销量" },
  { value: "price", label: "价格" },
];
const sortWay = ref("");

const changeSort = (val) => {
  if (sortName.value !== "price" && val == "price") {
    sortWay.value = "desc";
  }
  if (sortName.value === val && sortName.value !== "price") {
    return;
  }
  sortName.value = val;

  onRefresh(0);
};

const navBack = () => {
  router.back();
};

const onLoad = async (index) => {
  try {
    const currentList = list.value[index];
    currentList.loading = true;

    if (currentList.refreshing) {
      currentList.page = 1;
      currentList.items = [];
      currentList.refreshing = false;
    } else {
      currentList.page += 1;
    }

    let params = {
      page: currentList.page,
      pageSize: 20,
      chanType: 3,
      keyword: keywords,
      sortName: sortName.value,
    };
    if (sortName.value == "sales") {
      params.sort = "desc";
    } else if (sortName.value == "price") {
      if (sortWay.value == "desc") {
        sortWay.value = "asc";
      } else {
        sortWay.value = "desc";
      }
      params.sort = sortWay.value;
    }
    console.log(params);

    const { data: contentRes } = await getSearchList(params);

    currentList.items = currentList.items.concat(contentRes.data.list);

    currentList.loading = false;
    currentList.refreshing = false;

    if (!contentRes.data.hasNext) {
      currentList.finished = true;
    }
  } catch (error) {
    console.error(error, "onLoad");
  }
};

const onRefresh = (index) => {
  list.value[index].finished = false;
  list.value[index].refreshing = true;
  onLoad(index);
};
</script>

<template>
  <div class="search-result">
    <van-sticky>
      <div class="search" @click="navBack">
        <div class="arrow-left"><van-icon name="arrow-left" /></div>
        <van-search
          v-model="keywords"
          readonly
          label="商品"
          placeholder="请输入搜索关键词"
        >
        </van-search>
      </div>
      <div class="search-bar">
        <div
          v-for="(item, index) in sortList"
          :key="index"
          @click="changeSort(item.value)"
        >
          <div class="bar-inner">
            <span :class="{ active: item.value == sortName }">{{
              item.label
            }}</span>
            <div v-if="item.value == 'price'" class="sort">
              <IconUp
                :color="sortWay == 'asc' ? 'rgba(229, 36, 25, 1)' : '#999'"
              />
              <IconDown
                :color="sortWay == 'desc' ? 'rgba(229, 36, 25, 1)' : '#999'"
              />
            </div>
          </div>
        </div>
      </div>
    </van-sticky>

    <van-list
      v-model:loading="list[0].loading"
      :finished="list[0].finished"
      @load="onLoad(0)"
    >
      <list-comp :items="list[0].items" />
    </van-list>

    <van-back-top />
  </div>
</template>