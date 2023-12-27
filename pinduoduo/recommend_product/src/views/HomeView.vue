<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCategoryList, getGoodsList } from "../utils/req";
import ListComp from "../components/List.vue";

const list = ref([]);
const banner = ref([]);
const router = useRouter();

const navToSearchPage = () => {
  localStorage.removeItem("keywords");
  router.push("search");
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
    };
    if (index != 0) {
      params.catId = currentList.cateId;
    }

    const { data: contentRes } = await getGoodsList(params);

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
  onLoad(index);
};

// 获取分类列表
const getTabList = async () => {
  try {
    // 获取分类列表
    const { data: cateRes } = await getCategoryList();

    banner.value = cateRes.data.banner;

    // 分类列表
    const cateList = [
      { cateId: 0, cateName: "推荐" },
      ...cateRes.data.cateType,
    ];

    list.value = cateList.map((item) => {
      return {
        cateId: item.cateId,
        cateName: item.cateName,
        items: [],
        page: 0,
        refreshing: false,
        loading: false,
        error: false,
        finished: false,
      };
    });
  } catch (error) {
    console.error(error, "getTabList");
  }
};
getTabList();
</script>

<template>
  <main class="main">
    <van-sticky @click="navToSearchPage">
      <van-search shape="round" readonly placeholder="请输入搜索关键词" />
    </van-sticky>

    <van-tabs class="myTab" :ellipsis="false" sticky animated swipeable offset-top="14.4vw">
      <van-tab
        v-for="(cate, index) in list"
        :key="index"
        :title="cate.cateName"
      >
        <van-pull-refresh v-model="cate.refreshing" @refresh="onRefresh(index)">
          <van-list
            v-model:loading="cate.loading"
            :finished="cate.finished"
            @load="onLoad(index)"
          >
            <div v-if="cate.cateId == 0">
              <van-swipe
                class="my-swipe"
                :autoplay="3000"
                indicator-color="white"
              >
                <van-swipe-item v-for="(bitem, _idx) in banner" :key="_idx">
                  <img :src="bitem.img" class="banner_img" />
                </van-swipe-item>
              </van-swipe>
            </div>
            <list-comp :items="cate.items" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-back-top />
  </main>
</template>