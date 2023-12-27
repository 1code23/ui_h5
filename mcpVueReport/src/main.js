import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";
import html2canvas from "html2canvas";

import * as commonApi from "@/api/commonApi";
import * as utils from "@/common/utils/utils";
import MultTable from "@/components/MultTable.vue";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: "small" });

window.html2canvas = html2canvas;
Vue.prototype.echarts = echarts;
Vue.prototype.$utils = utils;
Vue.prototype.$commonApi = commonApi;
Vue.component("MultTable", MultTable);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
