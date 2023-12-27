<script setup>
import { showToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const keywords = ref("");
const keywordsRef = ref(null);
const searchHistory = ref([]);

const local_key = localStorage.getItem("keywords");
if (local_key) {
  keywords.value = local_key;
}

setTimeout(() => {
  keywordsRef.value?.focus();
});

let historySearchList = localStorage.getItem("search_history");
if (historySearchList) {
  searchHistory.value = JSON.parse(historySearchList);
}

const onSearch = () => {
  const __val = keywords.value.trim();

  if (__val == "") {
    showToast("请输入您要搜索的内容~");
    keywordsRef.value?.focus();
    return;
  }

  dataExe(__val);
};

const dataExe = (__val) => {
  localStorage.setItem("keywords", __val);

  // 将数据存储在历史搜索记录里面
  let __new_list = searchHistory.value;
  if (__new_list.length) {
    const _findIndex = __new_list.findIndex((item) => item == __val);
    if (_findIndex != -1) {
      // 删除当前位置的数据
      __new_list.splice(_findIndex, 1);
    }
  }
  __new_list.unshift(__val);
  localStorage.setItem("search_history", JSON.stringify(__new_list));

  router.push("search_result");
};

const clearHistory = () => {
  localStorage.removeItem("search_history");
  searchHistory.value = [];
};

const navBack = () => {
  router.back();
};
</script>

<template>
  <div>
    <div class="search">
      <div @click="navBack" class="arrow-left">
        <van-icon name="arrow-left" />
      </div>
      <van-search
        v-model="keywords"
        show-action
        ref="keywordsRef"
        label="商品"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div class="btn_search" @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <div v-if="searchHistory.length" class="history">
      <div class="history_title">
        历史搜索 <van-icon name="delete-o" @click="clearHistory" />
      </div>

      <div class="history_list">
        <span
          v-for="(item, index) in searchHistory"
          :key="index"
          @click="dataExe(item)"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>