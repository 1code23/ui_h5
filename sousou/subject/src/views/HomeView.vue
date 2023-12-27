<script setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

import {
  getCategoryByThemeId,
  getThemeInfo,
  getContentList,
  getContentAll,
} from "../utils/req";
import { formatTimeFromNow } from "../utils/index";
import { showLoadingToast, closeToast } from "vant";

const route = useRoute();
const active = ref(0);
const obj = reactive({ info: {}, category: [] });

const showLoading = () => {
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    loadingType: "spinner",
    message: "加载中...",
  });
};

const getNewsList = async (index, cateList) => {
  try {
    let cate_item;
    if (cateList) cate_item = cateList[index];
    else cate_item = obj.category[index];

    if (!cateList) {
      if (obj.category[index].fetched) {
        return;
      } else {
        showLoading();
      }
    }

    const { data: contentRes } = await getContentList({
      theme_id: cate_item.theme_id,
      category_id: cate_item.id,
    });

    if (cateList) {
      obj.category = cateList.map((item, index) => {
        if (index == 0) {
          item.fetched = true;
          item.list = contentRes.data;
        } else {
          item.fetched = false;
          item.list = [];
        }
        return item;
      });
    } else {
      obj.category[index].fetched = true;
      obj.category[index].list = contentRes.data;
    }

    closeToast();
  } catch (error) {
    console.log(error, "error");

    closeToast();
  }
};

const onLoad = async () => {
  showLoading();
  try {
    let theme_id = route.query.id;
    if (theme_id) theme_id = parseInt(theme_id);
    else theme_id = 1;

    // 获取主题详情
    const { data: infoRes } = await getThemeInfo({
      theme_id,
    });
    obj.info = infoRes.data;
    document.title = infoRes.data.theme_name

    // 获取分类列表
    // const { data: cateRes } = await getCategoryByThemeId({
    //   theme_id,
    // });
    // if (cateRes.data.length > 0) {
    //   // 获取第一个分类下的列表数据
    //   await getNewsList(0, cateRes.data);
    //   cateRes.data.map((item, index) => {
    //     if (index !== 0) getNewsList(index);
    //   });
    // }

    const { data: cateRes } = await getContentAll({
      theme_id,
    });
    obj.category = cateRes.data.map((item, index) => {
      item.fetched = true;
      item.category_name = item.cateName;
      return item;
    });

    closeToast();
  } catch (error) {
    console.log(error, "error");

    closeToast();
  }
};
onLoad();

const tabClicked = (evt) => {
  getNewsList(evt.name);
};
const navToDetail = (item) => {
  if (item.link) location.href = item.link;
};
</script>

<template>
  <main
    class="main"
    :style="{
      '--backgroundColor': obj.info.bg_color,
      '--labelColor': obj.info.label_color,
      backgroundColor: obj.info.bg_color,
    }"
  >
    <img :src="obj.info.bg_img" class="banner" alt="" />

    <van-tabs
      class="myTab"
      :ellipsis="false"
      scrollspy
      sticky
      v-model:active="active"
      @click-tab="tabClicked"
    >
      <van-tab
        v-for="(cate, index) in obj.category"
        :title="cate.category_name"
      >
        <div class="card_title">{{ cate.category_name }}</div>
        <a
          v-for="item in cate.list"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <!-- <div v-for="item in cate.list" @click="navToDetail(item)"> -->
          <div class="wx-row" v-if="item.format == 1">
            <div class="inner one_big">
              <h3>{{ item.title }}</h3>
              <img
                v-if="item.news_img != ''"
                :src="item.news_img.split('^^')[0]"
              />
              <p>
                <span>{{ item.source }}</span>
                {{ formatTimeFromNow(item.news_time) }}
              </p>
            </div>
          </div>
          <div class="wx-row pic3" v-if="item.format == 2">
            <div class="inner">
              <h3>{{ item.title }}</h3>
              <div v-if="item.news_img != ''">
                <img v-for="item in item.news_img.split('^^')" :src="item" />
              </div>
              <p>
                <span>{{ item.source }}</span>
                {{ formatTimeFromNow(item.news_time) }}
              </p>
            </div>
          </div>
          <div class="wx-row pic1" v-if="item.format == 3">
            <div class="c-left">
              <h3>{{ item.title }}</h3>
              <p>
                <span>{{ item.source }}</span>
                {{ formatTimeFromNow(item.news_time) }}
              </p>
            </div>
            <div class="c-right">
              <img
                v-if="item.news_img != ''"
                :src="item.news_img.split('^^')[0]"
              />
            </div>
          </div>
          <div class="wx-row" v-if="item.format == 4">
            <div class="inner one_big">
              <h3>{{ item.title }}</h3>
              <div class="shipin">
                <img
                  v-if="item.news_img != ''"
                  :src="item.news_img.split('^^')[0]"
                />
                <div class="icon-outter">
                  <img src="../assets/images/play.png" />
                  <!-- <span class="iconfont icon-shipin"></span> -->
                </div>
              </div>
              <p>
                <span>{{ item.source }}</span>
                {{ formatTimeFromNow(item.news_time) }}
              </p>
            </div>
          </div>
          <!-- </div> -->
        </a>
        <!-- <div
          v-if="
            index + 1 == obj.category.length &&
            cate.fetched &&
            cate.list.length > 0
          "
          class="van-list__finished-text"
        >
          没有更多了
        </div> -->
        <div v-if="cate.fetched && cate.list.length <= 0">
          <van-empty image-size="32vw" description="这里空空如也～" />
        </div>
      </van-tab>
    </van-tabs>
  </main>
</template>

<style lang="scss" scoped>
// @include flex();
@mixin flex() {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  -webkit-align-items: stretch;
  align-items: stretch;
}
.main {
  position: relative;
  animation-duration: 0.6s;
  animation-fill-mode: both;
  animation-name: fadeIn;
}
.banner {
  width: 100%;
  height: 220px;
}
.myTab {
  width: 100%;
  margin-top: -80px;
  padding-bottom: 20px;
}
.van-list__finished-text {
  padding-top: 14px;
  color: #999;
  font-size: 12px;
  text-align: center;
}
:deep(.van-sticky--fixed) {
  background-color: var(--backgroundColor);
  .van-tab {
    color: #333;
  }
  .van-tab--active {
    color: #00bedd;
    color: var(--labelColor);
  }
}
:deep(.van-tabs__nav) {
  border-width: 0;
  margin: 0;
  padding: 0 16px;
  background-color: transparent;
}
:deep(.van-tabs__line) {
  width: 0;
}
:deep(.van-tabs--line .van-tabs__wrap) {
  height: 52px;
}
:deep(.van-tabs__nav--line) {
  height: 31px;
  margin-top: 11px;
}
:deep(.van-tab) {
  border-right-width: 0;
  background-color: rgba(255, 255, 255, 0.96);
  border-radius: 31px;
  backdrop-filter: blur(2px);
  color: #333;
  margin-right: 10px;
}
:deep(.van-tab--active) {
  color: #00bedd;
  color: var(--labelColor);
  background: #ffffff;
  font-weight: bold;
}
:deep(.van-tabs__content) {
  width: 93.3%;
  margin: 0 auto;
}
:deep(.van-tab__panel) {
  background: #ffffff;
  border-radius: 16px;
  padding: 18px 16px 18px;
  margin-bottom: 10px;
}
.card_title {
  font-size: 16px;
  color: #000000;
  line-height: 20px;
  font-weight: bold;
  padding-top: 2px;
}
.wx-row {
  @include flex();
  width: 100%;
  padding: 12px 0;
  h3 {
    font-size: 16px;
    font-family: HarmonyOS_Sans_SC;
    color: #000000;
    line-height: 23px;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    margin-bottom: 10px;
  }
  p {
    color: #999;
    margin-top: 10px;
    font-size: 12px;
    line-height: 12px;
    display: flex;
    flex-wrap: nowrap;
    span {
      max-width: 170px;
      margin-right: 5px;
      word-break: keep-all;
      overflow: hidden;

      display: -webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }
  }
  .inner {
    box-sizing: border-box;
    width: 100%;
  }

  .one_big {
    img {
      width: 100%;
      height: 184px;
      border-radius: 6px;
    }
    p > span {
      max-width: 265px;
    }
  }

  .shipin {
    position: relative;

    .icon-outter {
      width: 100%;
      height: 184px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;

      .iconfont {
        color: #ffffff;
        font-size: 48px;
      }
      img {
        width: 48px;
        height: 48px;
      }
    }
  }
}

.pic1 {
  .c-left {
    flex: 2;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 6px;
  }
  .c-right {
    align-self: flex-end;
    img {
      width: 98px;
      height: 90px;
      border-radius: 6px;
    }
  }
}

.pic3 > div > div {
  @include flex();
  justify-content: space-between;
  margin-top: 10px;
  img {
    width: 100px;
    height: 90px;
    border-radius: 6px;
  }
}
</style>
