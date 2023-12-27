import request from './http';

export function sendYaohuoPlanCode(params) {//发送手机号验证码
    return request("post", "/YaohuoPlan/send", params)
}
export function submitData(params) {//报名保存
    return request("post", "/YaohuoPlan/apply", params)
}