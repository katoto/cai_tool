import util from "../base";
import store from "@/store/index.js";
import { toast } from "./tool";

const ApiHostMap = {
  stg: "https://car-life-stg.huolala.cn",
  pre: "https://car-life-pre.huolala.cn",
  prod: "https://car-life.huolala.cn"
};

let baseURL = ApiHostMap.prod;
// car-life.huolala.cn
const Header = {};

let RequestObject = {
  header: Header,
  timeout: 15000, // 超时
  method: "POST"
};
let postData = {
  system: {
    deviceType: uni.getSystemInfoSync().platform, // 设备类型 ios android devtools
    clientType: "wxa", // WXA：微信小程序，BDA：百度小程序 ，ALIA：支付宝小程序，M_WXA：搬家小程序，M_IOS：搬家iOS 等等
    token: uni.getStorageSync("token")
  }
};

if (
  process &&
  process.env &&
  (process.env.NODE_ENV === "production" ||
    process.env.VUE_APP_PLATFORM === "mp-weixin")
) {
  // 小程序环境
  if (
    process.env.VUE_APP_ENV &&
    (process.env.VUE_APP_ENV === "stg" || process.env.VUE_APP_ENV === "pre")
  ) {
    baseURL = ApiHostMap[process.env.VUE_APP_ENV];
  }
} else {
  // h5走代理，跨域
  baseURL = process.env.NODE_ENV === "development_mock" ? "/mock/1847" : "/api";
}

function network(url = "/", parameters, options = {}) {
  url = url.replace(/^\s+|\s+$/g, "");
  return _handleRequest(url, parameters, options);
}

/**
 * 网络请求
 * @param url, params, options = { parseData , showErrorMsg, showLoading, method, dontHandlerData  }
 * @returns
 * @options @parseData // 如果传入options.parseData 则对请求回来数据，进行格式, function
 * @options @showErrorMsg // 默认展示toast error； Boolean true false
 * @options @showLoading // 默认不展示loading； Boolean true false
 * @options @method // 请求类型 post 、get; String 类型
 * @options @limitSys // 限定公共参数字段
 * @options @dontHandlerData // 如果传入options.dontHandlerData 则不处理数据格式，直接返回原始数据
 *    finalResponse = {
        errInfo: { code, msg },
        data: {},
        system
       }
 */
function _handleRequest(url = "/", parameters = "", options = {}) {
  if (!postData.system) {
    postData.system = {};
  }
  postData.system.token = uni.getStorageSync("token");
  postData.system.latitude = store.state.latitude || ""; // 纬度
  postData.system.longitude = store.state.longitude || ""; // 经度

  // 适配 车吉吉所有数据在data对象里
  parameters = _sendAdapter(parameters, postData.system, options);

  let _currentOptions = {
    parseData: undefined, // 格式处理
    showErrorMsg: true, // 是否显示err
    showLoading: false, // 是否不展示loading 默认不展示
    method: "POST",
    ...options
  };
  if (!_currentOptions.method) {
    _currentOptions.method = "POST";
  }
  RequestObject.method = _currentOptions.method.toUpperCase() || "POST";
  if (_currentOptions.showLoading) {
    uni.showLoading({
      title: "加载中"
    });
  }
  if (!(url.includes("https://") || url.includes("http://"))) {
    url = baseURL + url;
  }

  return new Promise(resolve => {
    let finalResponse = {};
    uni.request({
      url,
      data: {
        ...parameters
      },
      success: response => {
        let _currentData = response.data;
        if (util.isFunction(_currentOptions.parseData)) {
          _currentData = _currentOptions.parseData(response.data);
        }
        // 不出来数据格式
        if (_currentOptions.dontHandlerData) {
          resolve(_currentData);
          return;
        }
        // 网关错误
        if (_currentData.ret === 0) {
          finalResponse.data = _currentData.data;
        } else {
          finalResponse.errInfo = _handleError(
            _currentData.ret,
            _currentData.msg,
            _currentOptions.showErrorMsg
          );
        }
        // resolve 处理
        resolve(finalResponse);
      },
      fail: response => {
        finalResponse.errInfo = _handleError(
          response.statusCode,
          response.errMsg
        );
        resolve(finalResponse);
      },
      complete: () => {
        if (_currentOptions.showLoading) {
          setTimeout(() => {
            if (store.state.loadingFlag === "1") {
              setTimeout(() => {
                uni.hideLoading();
              }, 1500);
            } else {
              uni.hideLoading();
            }
          }, 100);
        }
      },
      ...RequestObject
    });
  });
}

function _handleError(code, info, isShowErrorMessage = true) {
  let _currentInfo = info;
  if (!_currentInfo) {
    _currentInfo = "网络异常，请稍后再试";
  }
  // 21001 跳登录
  if (code === "21001" || code === 21001 || code === 21004) {
    debounce();
  } else {
    if (isShowErrorMessage) {
      toast(_currentInfo);
    }
  }
  return {
    code: code,
    msg: info
  };
}

// 防抖，当用户未登录时跳转到登陆页面，为避免多个接口抛出相同异常导致多次跳转，加入防抖只触发最后一次。
// 跳其他页面情况 todo
let _timer;

function debounce() {
  uni.removeStorageSync("token");
  store.commit("setIsLog", false);
  _timer && clearTimeout(_timer);
  // 暂时不自动跳转
}

/**
 * 适配system 参数在data里, hll
 * @param {*} data
 * @param {*} params
 * @param {*} system
 */
function _sendAdapter(parameters = {}, system = {}, options) {
  if (!parameters) {
    parameters = {};
    parameters.data = {};
  }
  if (options && options.limitSys && Array.isArray(options.limitSys)) {
    let limitSysObject = {};
    for (let sysItem in system) {
      if (options.limitSys.includes(sysItem)) {
        limitSysObject[sysItem] = system[sysItem];
      }
    }
    parameters.data = {
      ...limitSysObject,
      ...parameters.data
    };
  } else {
    parameters.data = {
      ...system,
      ...parameters.data
    };
  }
  return parameters;
}

module.exports = {
  network
};
