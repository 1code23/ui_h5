import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// PC端路由表
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import(/* webpackChunkName: "about" */ '../views/join.vue')
  },
]
// 移动端路由表
const routesPhone = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/homePhone.vue')
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('../views/joinPhone.vue')
  }
]
//判断是不是移动端
function isMobile() {
  let userAgentInfo = navigator.userAgent;
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let getArr = Agents.filter(i => userAgentInfo.includes(i));
  return getArr.length ? true : false;
}
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes:isMobile()?routesPhone:routes//PC和移动端显示不同路由
})
export default router
