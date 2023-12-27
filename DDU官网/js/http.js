document.write('<script src="js/index-obfuscated.js" type="text/javascript" charset="utf-8"></script>');

var baseUrl = "http://10.20.40.128:7089"
// https://www.droidigitaluniverse.com正式环境地址
// https://http://10.20.40.128:6098/测试环境地址
function httpCrypto(reqData) {// 加密请求
  reqData.data.timestamp = new Date().getTime() / 1000
  var sm4 = encrypt4(JSON.stringify(reqData.data));// 加密
  $.ajax({
    type: reqData.type || "get",
    url: baseUrl + reqData.url,
    data: JSON.stringify({ data: sm4 }),
    dataType: reqData.dataType || 'json',
    contentType: 'application/json',
    headers: {
      sign: sign(sm4),
    },
    success: function (res, status, xhr) {
      var signVal = xhr.getResponseHeader("sign")
      if (signVal && verifySign(res.data, signVal)) {
        var decryptData = JSON.parse(decrypt4(res.data))
        reqData.success(decryptData, status, xhr)
      }
    },
    error: reqData.error,
  })
}
function http(reqData) {// 不加密请求
  var obj = {
    type: reqData.type || "get",
    url: baseUrl + reqData.url,
    success: reqData.success,
    error: reqData.error,
    data: reqData.data,
    dataType: 'json',
    contentType: 'application/json',
  }
  $.ajax(obj)
}


