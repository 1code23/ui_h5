!function (window) {

    /* 设计图文档宽度 */
    var docWidth = 750;
  
    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  
    var recalc = (function refreshRem() {
      var clientWidth = docEl.getBoundingClientRect().width;
  
      /* 8.55：小于320px不再缩小，11.2：大于420px不再放大，20：大于750 */
      docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 20), 8.55) * 5 + 'px';
      if(clientWidth>750){
        docEl.style.fontSize=clientWidth/7.5+"px"
      }
  
      return refreshRem;
    })();
  
    /* 添加倍屏标识，安卓为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);
  
    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
      /* 添加IOS标识 */
      doc.documentElement.classList.add('ios');
      /* IOS8以上给html添加hairline样式，以便特殊处理 */
      if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
        doc.documentElement.classList.add('hairline');
    }
  
    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  
  }(window);


  function htmlFontSize(){
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var width = w > h ? h : w;
    width = width > 720 ? 720 : width
    var fz = ~~(width*100000/36)/10000
    document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz +"px";
    var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px','')*10000)/10000
    if (fz !== realfz) {
        document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz * (fz / realfz) +"px";
    }
}
