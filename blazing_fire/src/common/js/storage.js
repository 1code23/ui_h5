import {
  USERINFO,
  LOGINTIME,
  LASTTIME,
  TIMEOUT,
  POWERTREE,
  AllEGERESULT,
  TOKENKEY
} from "@/common/constant/constant.js";

const storage = Object.create({
  // 将信息保存到localStorage
  setItem(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  // 获取localStorage里的信息
  getItem(key, defaultValue) {
    let value = localStorage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch { }
    return value || defaultValue;
  },
  // 移除localStorage里的信息
  removeItem(key) {
    localStorage.removeItem(key);
  },
  // 清除存储在localStorage里的信息
  clearSession() {
    localStorage.clear();
    localStorage.setItem('isAPPNoticeFlag',true)//五一节假日通知已读
  },
  // 保存当前登录的用户信息
  setUserInfo(userInfo) {
    this.setItem(USERINFO, userInfo);
  },
  // 保存登录的时间和错误次数
  setLoginTime(loginTime) {
    this.setItem(LOGINTIME, loginTime);
  },
  // 获取登录的时间和错误次数
  getLoginTime() {
    return this.getItem(LOGINTIME);
  },
  //保存查询的申诉进度结果
  setAllegeResult(allegeResult) {
    this.setItem(AllEGERESULT, allegeResult)
  },
  // 获取查询的申诉进度
  getAllegeResult() {
    return this.getItem(AllEGERESULT);
  },
  // 保存当前登录的用户信息
  setPowerTree(menu) {
    this.setItem(POWERTREE, menu);
  },
  getPowerTree() {
    return this.getItem(POWERTREE);
  },
  // 获取用户信息
  getUserInfo() {
    return this.getItem(USERINFO);
  },
  // 保存最后一次点击的时间
  setLastTime(lastTime) {
    this.setItem(LASTTIME, lastTime);
  },
  // 获取最后一次点击的时间
  getLastTime() {
    return this.getItem(LASTTIME);
  },
  // 判断是否登录过
  isLogin() {
    const userInfo = this.getUserInfo();
    if (!userInfo) return false; // 无用户登录信息
    const currentTime = new Date().getTime(); //当前时间
    const lastTime = this.getLastTime(); //最后一次点击的时间
    if (currentTime - lastTime > TIMEOUT) {
      // 登录超时
      this.clearSession();
      return false;
    }
    return true;
  },
  getToken() {
    const token = localStorage.getItem(TOKENKEY);
    return token || null;
  },
  setToken(token) {
    localStorage.setItem(TOKENKEY, token);
  },
});

export default storage;
