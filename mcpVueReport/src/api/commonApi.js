import request from "@/config/serve.js";

// // 收入汇总
// export function totalIncomeData(params) {
//   return request("get", "/admin/Report/totalIncomeData", params);
// }
// // 桌面、负一屏、手机管家、搜搜、最美万年历
// export function appAdData(data) {
//   return request("post", "/admin/Report/appAdData", data);
// }
// // 各产品版本更新率
// export function appVerActiveData(params) {
//   return request("get", "/admin/Report/appVerActiveData", params);
// }
// // 各产品版本更新率发邮件
// export function getEmailHtml(params) {
//   return request("post", "/admin/report/getEmailHtml", params);
// }
// 预装包收入
export function AppPreInstallData(params) {
  // return request("get", "/admin/Report/appPreInstallData", params);
  return request("get", "/admin/VueReport/countryIncomeReportData", params);
}
// // 文件夹应用
// export function ApkFolderData(params) {
//   return request("get", "/admin/Report/apkFolderData", params);
// }
// // 运营周报
// export function appIncomeWeekData(params) {
//   return request("get", "/admin/Report/appIncomeWeekData", params);
// }
// // 预装周报
// export function appPreInstallWeekData(params) {
//   return request("get", "/admin/Report/appPreInstallWeekData", params);
// }
// // 文件包收入
// export function apkPackageFolderData(data) {
//   return request("post", "/admin/Report/apkPackageFolderData", data);
// }
