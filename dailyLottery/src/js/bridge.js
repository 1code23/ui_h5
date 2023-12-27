let isAndroid = (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) && navigator.userAgent.indexOf('fxapp_android') > -1
let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && navigator.userAgent.indexOf('fxapp_ios') > -1
// 这是必须要写的，用来创建一些设置
function setupWebViewJavascriptBridge(callback) {
    console.log("setupWebViewJavascriptBridge")
    // Android使用
    if (isAndroid) {
        console.log("android")
        if (window.WebViewJavascriptBridge) {
            callback(window.WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                () => {
                    callback(window.WebViewJavascriptBridge)
                },
                false
            )
        }
    }

    // iOS使用
    if (isiOS) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge)
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        console.log(WVJBIframe,'12')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(() => {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }
}

// 注册回调函数，第一次连接时调用 初始化函数(android需要初始化,ios不用)
setupWebViewJavascriptBridge((bridge) => {
    if (isAndroid) {
        // 初始化
        bridge.init((message, responseCallback) => {
            var data = {
                'Javascript Responds': 'Wee!'
            }
            responseCallback(data)
        })
    }
})

export default {
    callHandler(name, data, callback) {
        setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler(name, data, callback)
        })
    },
    registerHandler(name, callback) {
        console.log("register")
        setupWebViewJavascriptBridge((bridge) => {
            bridge.registerHandler(name, (data, responseCallback) => {
                callback(data, responseCallback)
            })
        })
    }
}