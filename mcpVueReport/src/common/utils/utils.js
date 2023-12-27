// 生成快照(元素截图)
export function toImage(el) {
  return new Promise((resolve, reject) => {
    // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
    window
      .html2canvas(el, {
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
      })
      .then((canvas) => {
        const url = canvas.toDataURL("image/png");
        resolve(url);
      });
  });
}
export function downloadHtml(htmlStr, fileName="运营日报") {
    const content = htmlStr;
    //生成报告
    const link = document.createElement("a");
    link.download = `${fileName}.html`; // 文件名
    link.style.display = "none";
    // 创建文件流
    const blob = new Blob([content], { type: "text/html" }); // 创建bolb实例时，内容一定要放在[]中
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
