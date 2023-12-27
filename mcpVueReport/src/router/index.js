import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/countryIncome",
  },
  // {
  //   path: "/incomeTotal",
  //   name: "IncomeTotal",
  //   component: () => import("@/views/IncomeTotal.vue"),
  //   meta: { title: "收入汇总" },
  // },
  // {
  //   path: "/appAdData",
  //   name: "AppAdData",
  //   component: () => import("@/views/AppAdData.vue"),
  //   meta: { title: "应用的运营日报" },
  // },
  // {
  //   path: "/apkPackageFolderData",
  //   name: "apkPackageFolderData",
  //   component: () => import("@/views/apkPackageFolderData.vue"),
  //   meta: { title: "文件包收入" },
  // },
  // {
  //   path: "/appVerActive",
  //   name: "AppVerActive",
  //   component: () => import("@/views/AppVerActive.vue"),
  //   meta: { title: "各产品版本更新率" },
  // },
  {
    path: "/countryIncome",
    name: "CountryIncome",
    component: () => import("@/views/CountryIncome.vue"),
    meta: { title: "国家报表" },
  },
  // {
  //   path: "/apkFolder",
  //   name: "apkFolder",
  //   component: () => import("@/views/apkFolder.vue"),
  //   meta: { title: "文件夹应用" },
  // },
  // {
  //   path: "/appIncomeWeek",
  //   name: "appIncomeWeek",
  //   component: () => import("@/views/appIncomeWeek.vue"),
  //   meta: { title: "运营周报" },
  // },
  // {
  //   path: "/appPreInstallWeek",
  //   name: "appPreInstallWeek",
  //   component: () => import("@/views/appPreInstallWeek.vue"),
  //   meta: { title: "预装周报" },
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
