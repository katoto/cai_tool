import {
  joinParams,
  getUrlParams,
  throttle,
  parseUrlStrParamsToObj,
  isWebLink
} from "@/common/base/index";
import { toast } from "./tool";
import { DefaultCity } from "@/common/config.js";
import store from "@/store/index.js";

// 自身tabbar
const TabbarPage = new Set(["/pages/usercenter/index/tabbar"]);
// 自身appid
const SelfAppid = "wxcb2a35013b0815d2";

/**
 *
 * pageHref 路由跳转
 * @param {String} url 跳转链接
 * @param {String} type 分发类型
 * @param {String} options 参数 type title
 * @returns {Boolean} true \ false
 *
 */
function pageHref(url, data = "", options = {}) {
  let type = options.type || "page";
  if (options.title) {
    setPageTitle(options.title); // 设置标题
  }
  if (typeof url === "number" || url === "back") {
    type = "back";
  } else {
    if (isWebLink(url)) {
      type = "webview";
    } else if (options.appId) {
      if (SelfAppid === options.appId) {
        if (type !== "redirect") {
          type = "page";
        }
      } else {
        type = "navigateToMiniProgram";
      }
    }
    // 处理url 参数
    url = urlStringHandle(url, data);
    console.log(url);
    if (isTabbarPage(url)) {
      type = "tab";
    }
  }
  distributeMiniHref(url, type, options);
}

/**
 *  设置标题
 */
function setPageTitle(title = "") {
  setTimeout(() => {
    uni.setNavigationBarTitle({
      title
    });
  }, 80);
}

/**
 *  检查是否是tabbar页面
 */
function isTabbarPage(url) {
  let domainUrl = url;
  if (url && url.includes("?")) {
    domainUrl = url.slice(0, url.indexOf("?"));
  }
  return TabbarPage.has(domainUrl);
}

/**
 *  urlStringHandle url 链接参数处理
 */
function urlStringHandle(url, data) {
  if (data) {
    url = joinParams(url, {
      ...data
    });
  }
  if (url.startsWith("pages/") || url.startsWith("subPack/")) {
    // 兼容pages/xx === /pages/xx 页面也可以跳转
    return `/${url}`;
  }
  return url;
}

/**
 * distributeMiniHref 微信小程序 跳转路径分发
 * @param {String} url 跳转链接
 * @param {String} type 分发类型
 * @param {String} options 参数
 * @returns {Boolean} true \ false
 */
function distributeMiniHref(url, type, options = "") {
  console.log(
    `--distributeMiniHref-- url:${url} type:${type} options:${JSON.stringify(options)}--`
  );
  switch (type) {
    case "page":
      return uni.navigateTo({
        url: url
      });
    case "tab":
      return uni.switchTab({
        url: url
      });
    case "redirect":
      return uni.redirectTo({
        url: url
      });
    case "reLaunch":
      return uni.reLaunch({
        url: url
      });
    case "back":
      return backHandle(url, options);
    case "webview": {
      return webViewHandle(url, options);
    }
    case "navigateToMiniProgram": {
      return navigateToMiniProgramHandle(url, options);
    }
    default:
      return distributeMiniHref(url, "page");
  }

  /**
   *  type back 路由处理
   */
  function backHandle(step, options) {
    let delta = options.delta || 1;
    if (typeof step === "number") {
      delta = step;
    }
    return uni.navigateBack({
      delta
    });
  }

  /**
   *  type webview 路由处理
   */
  function webViewHandle(webUrl, options) {
    if (!isWebLink(webUrl)) {
      console.error("pageHref err 跳webview 链接需是https开头");
      return false;
    }
    if (!store.state.isLog) {
      // 跳登陆页
      distributeMiniHref(`/pages/login/wx_login?cb=${encodeURIComponent(webUrl)}`, "page");
    } else {
      options.type === "redirect"
        ? distributeMiniHref(`/pages/webview/index?url=${encodeURIComponent(webUrl)}`, "redirect")
        : distributeMiniHref(`/pages/webview/index?url=${encodeURIComponent(webUrl)}`, "page");
    }
  }

  /**
   *  type navigateToMiniProgram 路由处理
   *  @options 参数todo appId 必须
   */
  function navigateToMiniProgramHandle(path = "", options) {
    if (!options.appId || !path) {
      console.error("pageHref err at navigateToMiniProgram 参数不对");
      return false;
    }
    uni.navigateToMiniProgram({
      path,
      appId: options.appId,
      extraData: {
        ...options
      },
      complete() {
        options.completeHandle && options.completeHandle();
      }
    });
  }
}

const throttlePageHref = throttle(pageHref, 250);

/**
 *  coupe 链接适配
 * 1、 第三方小程序 thirdMini: //xxx.cn/?appId=[小程序应用ID]&path=[encodeURIComponent(路径)]
 *     例如：thirdMini://xxx.cn/?appId=wxc4ab51598b79f822&path=pages/common/blank-page/index
 *     &type=[小程序版本类型] // ['release', 'develop', 'trial']
 * 2、 车吉吉自有页面 例如： pages/home/index/index
 * 3、 车吉吉容器h5 例如：https://xxx.cn
 */
function coupeUrlAdapt(inpLink = "") {
  let path = inpLink;
  const urlParams = getUrlParams(inpLink);
  const options = {};
  if (!urlParams.appId || !urlParams.path) {
    console.error("coupeUrlAdapt url 配置错误");
    return false;
  }
  if (inpLink.startsWith("thirdMini")) {
    options.appId = urlParams.appId;
    path = urlParams.path;
  }
  throttlePageHref(path, "", options);
}

/**
 * resourceUrlAdapt stone 配置后台
 * @param {String} itemObj appId 小程序ID; action_link 配置的跳转链接
 * @returns
 */
function resourceUrlAdapt(item = {}, completeHandle) {
  if (item.action_link) {
    if (item.action_link.startsWith("thirdMini")) {
      console.warn("跳转thirdMini 请用coupeUrlAdapt");
      coupeUrlAdapt(item.action_link);
    }
    const baseObj = {
      appId: item.wx_link_id,
      completeHandle: completeHandle
    };
    if (item.name) {
      baseObj.title = item.name;
    }

    // #ifdef H5
    if (item.action_link.startsWith("https://")) {
      location.href = `${item.action_link}`;
      return true;
    }
    // #endif
    // #ifdef MP-WEIXIN
    if (item.action_link.startsWith("https://")) {
      // city & 经纬度
      let currCityObj = uni.getStorageSync("city") || "";
      if (currCityObj) {
        currCityObj = JSON.parse(currCityObj);
      }
      item.action_link = joinParams(item.action_link, {
        cityId: currCityObj.id || "",
        lat: store.state.latitude || DefaultCity.latitude,
        lon: store.state.longitude || DefaultCity.longitude,
        from: "chejj"
      });
    }
    // #endif
    throttlePageHref(item.action_link, "", {
      ...baseObj
    });
  } else if (item.content_text) {
    // 没有跳转链接，展示建设中
    toast(item.content_text);
  }
}

module.exports = {
  pageHref,
  throttlePageHref,
  coupeUrlAdapt,
  resourceUrlAdapt
};
