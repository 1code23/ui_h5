const regEmail = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
const regPhone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
const regTel = /^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
export function checkPhoneEmail(rule, value, cb) {
  if (regEmail.test(value) || regPhone.test(value)) { //合法的
    return cb()
  }
  cb(new Error('请输入正确的手机号或邮箱'))
}

export function checkEmail(rule, value, cb) {
  if (regEmail.test(value)) { //合法的
    return cb()
  }
  cb(new Error('请输入正确的邮箱'))
}
// 纯数字版本号
export function checkVersion(rule, value, cb) {
  // const regVersion=/^[1-9]d*$/
  const regVersion = /^\+?[1-9][0-9]*$/
  if (regVersion.test(value)) { //合法的
    return cb()
  }
  cb(new Error('版本号为大于等于1的数字'))
}

export function checkPasswordRule(rule, value, cb) {
  // 密码长度8-32位，需至少包含数字、大写字母、小写字母和符号(!@#$%^&*)中的3种。
  // const regPassword= /^(?![\da-z]+$)(?![\dA-Z]+$)(?![\d!@#$%^&*]+$)(?![a-zA-Z]+$)(?![a-z!@#$%^&*]+$)(?![A-Z!@#$%^&*]+$)[\da-zA-z!@#$%^&*]{8,32}$/
  const regPassword = /^(?![\da-z]+$)(?![\dA-Z]+$)(?![\d\W_]+$)(?![a-zA-Z]+$)(?![a-z\W_]+$)(?![A-Z\W_]+$)[\da-zA-z\W_]{8,32}$/
  if (/[\u4e00-\u9fa5 ]/.test(value)) {
    cb(new Error('请不要输入中文和空格'))
  }
  if (regPassword.test(value)) { //合法的
    return cb()
  }
  cb(new Error('请输入符合规则的密码'))
}
// 包名校验
export function checkPackage(rule, value, cb) {
  if (/[\u4e00-\u9fa5 ]/.test(value)) {
    cb(new Error('请不要输入中文和空格'))
  }else{
    return cb()
  }
}
// 校验是否https：//或http：//开头
export function checkDOwnUrl(rule, value, cb) {
  // const urlVerify = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/?:]?.*$/;
  const urlVerify = /(http|https):\/\/([\w.]+\/?)\S*/;
  const isUrl = urlVerify.test(value);
  if (!isUrl) {
    cb(new Error('请输入以http或https开头的正确下载地址'))
  }else{
    return cb()
  }
}

export function checkCard(rule, value, cb) {
  const regCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (regCard.test(value)) { //合法的
    return cb()
  }
  cb(new Error('请输入正确的身份证号'))
}
export function checkphone(rule, value, cb) {
  if (regPhone.test(value)) { //合法的
    return cb()
  }
  cb(new Error('请输入正确的手机号'))
}
export function checkphoneTel(rule, value, cb) {
  if (regTel.test(value) || regPhone.test(value)) { //合法的电话
    return cb()
  }
  cb(new Error('请输入正确的电话或手机号'))
}
export function checkCardFun(cardNo) {
  var idreg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  var cardNo = cardNo;
  if (idreg.test(cardNo)) {
    return true;
  } else {
    return false;
  }
}
export function checkPhoneFun(value) {
  if (regPhone.test(value)) { //合法的
    return true
  } else {
    return false;
  }
}
export function checkEmailFun(value) {
  if (regEmail.test(value)) { //合法的
    return true
  } else {
    return false;
  }
}

export function retrunFindSec(data, path, filterData, oriMenu) {
  data.forEach((item, index) => {
    if (item.items.find(c => c.path === path)) {
      let menu = item.items.find(c => c.path === path);
      filterData.menu = menu
    }
    if (item.items.length) {
      retrunFindSec(item.items, path, filterData, oriMenu)
    }
  })
  return filterData
}



// 数字转为千分位，并保留两个小数位
export function numberFilter(oldNum, isFixed) { // 例（123456.78）
  if (!oldNum && oldNum != 0) return; // 传入的数值为空直接返回空对象
  let newNum = oldNum.toLocaleString("en-US"); // 数字转成千分位 = 123,456.78
  const numArr = newNum.split("."); // 按小数点吧数字拆分 = [123,456, 78]
  if (!isFixed) { // 如果传了第二个参数，如果有小数位直接返回，否则向下执行
    if (!numArr[1]) { // 如果数组没有下标1的元素，就加.00，例：123,456 = 123,456.00
      newNum = newNum + ".00";
    } else if (numArr[1].length === 1) { // 如果数组下标1的元素只有一位小数，就加个0，例：123,456.7 = 123,456.70
      newNum = newNum + "0";
    } else if (numArr[1].length >= 2) { // // 如果数组下标1的元素小数位大于等于2位，就截取前两位，例：123,456.789 = 123,456.78
      newNum = numArr[0] + "." + numArr[1].substr(0, 2);
    }
  }
  return newNum;
}

export function timestampToTime(timestamp, str = "-") {
  if (typeof timestamp == "string") {
    //兼容IOS获取时间戳出现NAN问题
    timestamp = timestamp.replace(/-/g, '/');
  }
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + str;
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + str;
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D;
}



// 手机号隐藏中间几位
export function encryptPhone(tel) {
  return tel.substring(0, 3) + "****" + tel.substr(tel.length - 4);
}
// 邮箱隐藏中间几位
export function encryptEmail(email) {
  let newEmail = email;
  if (String(email).indexOf("@") > 0) {
    let str = email.split("@"),
      _s = "";
    //计算中间隐藏的位数
    const lth = Math.ceil(str[0].length / 3);
    for (let i = 0; i < lth; i++) {
      _s += "*";
    }
    // 计算除去需隐藏信息后的位数
    const l = Math.ceil((str[0].length - lth) / 2);
    newEmail =
      str[0].substr(0, l) + _s + str[0].substr(l + lth, l) + "@" + str[1];
  }
  return newEmail;
}
//判断数组中是否有重复值  isRepeat([1,2,3,2,4]) 返回true 表示有重复值
export function isRepeat(arr){
  let hash = {};
  for(var i in arr) {
    if(hash[arr[i]])
    return true;
    hash[arr[i]] = true;
  }
  return false;
}
/*
  base64加密、解密
*/

export const Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function (e) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = (n & 3) << 4 | r >> 4;
      u = (r & 15) << 2 | i >> 6;
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
    }
    return t
  },
  decode: function (e) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = s << 2 | o >> 4;
      r = (o & 15) << 4 | u >> 2;
      i = (u & 3) << 6 | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r)
      }
      if (a != 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = Base64._utf8_decode(t);
    return t
  },
  _utf8_encode: function (e) {
    e = e.replace(/rn/g, "n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192);
        t += String.fromCharCode(r & 63 | 128)
      } else {
        t += String.fromCharCode(r >> 12 | 224);
        t += String.fromCharCode(r >> 6 & 63 | 128);
        t += String.fromCharCode(r & 63 | 128)
      }
    }
    return t
  },
  _utf8_decode: function (e) {
    var t = "";
    var n = 0;
    var r, c1, c2, c3;
    r = c1 = c2 = 0;
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        n += 3
      }
    }
    return t
  }
}