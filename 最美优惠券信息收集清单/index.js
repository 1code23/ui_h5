
import "./index.css";
 const userId= getQueryVariable("userId")
 window.onload = function () {
 if(userId){
  $.ajax({
    // url: `/v1/user/analysis/${userId}`,
    url:`https://zmyhqapi.zm948.com/v1/user/analysis/${userId}`,// 生产打包完整地址
    xhrFields:{
      withCredentials:true
    },
    crossDomain:true,
    // data:{userId},
    method: 'GET',
    success(res) {
      const data = res.data
      $("#phone").text(data.phone)
      $("#phoneNumber").text(data.phoneNumber)
      $("#browse").text(data.browse)
      $("#device").text(data.device)
      $("#deviceId").text(data.deviceId)
    }
  })
 }
}
function getQueryVariable(variable) {
  const query= decodeURI(location.search).split("?")[1];
  const vars = query?query.split("&"):[];
  for (let i = 0; i < vars.length; i++) {
    const str=vars[i]
    const index=str.indexOf("=");// 第一个等号出现的位置
    const key=str.substring(0,index);
    const value=str.substring(index+1,str.length);
    if (key == variable) { return value; }
  }

  return (false);

}