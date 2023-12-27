import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as UTIL from "@/common/util/util";
import * as api from "@/common/js/api.js";
import { ElMessageBox } from "element-plus";
import gtMessage from "@/common/util/message.js";
window.Developer = {
  api,
};
window.devutil = UTIL;
window.ElMessage = gtMessage; // 默认只显示一个弹窗
window.ElMessageBox = ElMessageBox;
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
