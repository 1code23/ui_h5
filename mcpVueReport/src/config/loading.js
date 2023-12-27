let needLoadingCount = 0;
let loadingInstance; //单例一个loading
import { Loading } from "element-ui";
export function showFullLoading() {
  if (needLoadingCount === 0) {
    loadingInstance = Loading.service({
      lock: true,
      text: "Loading",
    });
  }
  needLoadingCount++;
}
export function tryHideFullScreenLoading() {
  if (needLoadingCount <= 0) return;
  needLoadingCount--;
  if (needLoadingCount === 0) {
    loadingInstance.close();
  }
}
