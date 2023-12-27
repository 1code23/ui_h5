const baseUrl = "https://photo-api.freemeos.com:8001";// 后端接口地址
//获取url参数
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

// 获取兑换码
function getVoucherCode() {
  const chipid = getQueryVariable('chipid');//从路由里获取chipid的值
  if (!chipid) { console.log('请在路由中传入参数chipid '); return }
  $.get({
    url: `${baseUrl}/code/${chipid}`,
    methad: 'get',
    data: { chipid },
    success(result) {
      if (result.status === 200) {
        const voucherCode = result.data.code || ''
        if (voucherCode !== '') {
          $('#voucher-code').text(voucherCode)
          $("#redeem-now").attr({ disabled: false })// 立即兑换按钮变为可点击
        } else {//没有获取到兑换码
          $('#voucher-code').text("BD34J36888T9");// 添加固定的兑换码作为立即兑换的底纹
          $('#voucher-code').addClass("blurry");// 给兑换码添加模糊效果 
          $('#receive-now').show();// 显示立即领取按钮
          $("#redeem-now").attr({ disabled: true })// 立即兑换按钮变为不可点击
        }
      } else {
        alert(result.message)
      }
    },
    error(err) { }
  })
}

// 绑定兑换码
function bindVoucherCode() {
  const chipid = getQueryVariable('chipid');//从路由里获取chipid的值
  if (!chipid) { console.log('请在路由中传入参数chipid '); return }
  $.post({
    url: `${baseUrl}/bind/code`,
    data: { chipid },
    success(result) {
      if (result.status === 200) {
        const voucherCode = result.data.code || ''
        if (voucherCode) {
          $('#voucher-code').removeClass("blurry");// 移除兑换码模糊效果 
          $('#voucher-code').text(voucherCode);// 设置兑换码内容
          $('#receive-now').hide()// 绑定后，隐藏立即兑换按钮
          $("#redeem-now").attr({ disabled: false })// 立即兑换按钮变为可点击
        }
      } else {
        alert(result.message)
      }
    },
    error(err) {
      $('#receive-now').text("获取失败，点击重新获取");
    }
  })
}

//立即领取触发事件
function handleClickReceiveNow(data) {
  bindVoucherCode();
}

//立即兑换触发事件
function handleClickRedeemNow(e) {
  const code = $('#voucher-code').text();// 设置兑换码内容
  // 调用安卓打开百度网盘的方法
  gallery.OpenBaidu(code)
}

$(document).ready(function () {
  getVoucherCode();
})