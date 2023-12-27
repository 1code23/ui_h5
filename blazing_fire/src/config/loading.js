
let needLoadingCount = 0;
let loadingInstance //单例一个loading
import { ElLoading } from 'element-plus'
export function showFullLoading(item) {
	if (needLoadingCount === 0) {
		loadingInstance = ElLoading.service({
			fullscreen: true,
			lock: true,
			text: 'Loading',
			customClass: "loadingClass",
		});
	}
	needLoadingCount++
}

export function tryHideFullScreenLoading(item) {
	if (needLoadingCount <= 0) return
	needLoadingCount--
	if (needLoadingCount === 0) {
		loadingInstance.close();
	}
}