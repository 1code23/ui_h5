import request from "./request";
// 获取信息接口
export function getActivityInfo(params) {
  return request("get", "/activity/index", params)
}
// 领取奖励
export function getAward(params) {
  return request("get", "/activity/get", params)
}
// 签到
export function signIn(params) {
  return request("get", "/activity/sign", params)
}