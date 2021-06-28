// 业务工具库
// base 基础工具函数
import {
  merge,
  getUrlParams,
  throttle
} from "../base/index";
import store from "@/store/index.js";

// 自身appid
const SelfAppid = 'wxcb2a35013b0815d2'

/**
 * toast options 详见uni.showToast
 * @param {String}
 * @returns {String}
 */
let toastTimer = null;

function toast(msg = "toast", options = {}, duration = 2500) {
  let _curr = {
    title: msg,
    icon: "none",
    duration: duration,
  };
  // if (store.state.loadingFlag === '1') {
  //   uni.hideLoading();
  //   uni.hideToast();
  // }
  store.commit("setLoadingFlag", "1");
  toastTimer && clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    store.commit("setLoadingFlag", "0");
  }, duration);

  return uni.showToast(merge(_curr, options));
}
/**
 * 页面跳转
 * @param {String} url 
 * $pageHref("/pages/coupon/index");
 * thirdMini://huolala.cn/?appId=[小程序应用ID]&path=[encodeURIComponent(路径)]&type=[小程序版本类型] // ['release', 'develop', 'trial']
 * 还有一种配置的情况
 * options // appid: ?
 */
function pageHref(url, data = "", options = {
  type: "page",
  delta: 1
}) {
  const homePath = "/pages/home/index/index";
  let type = options.type || "page";
  let delta = options.delta || 1;
  const HttpReg = /^(http|https):\/\/\w+/; // 检测链接httphttps
  const ThirdMiniReg = /^(thirdMini):\/\/\w+/; // 检测跳转第三方小程序
  if (options && options.title) {
    setTimeout(() => {
      setNavigationBarTitle(options.title);
    }, 80);
  }
  if (url === "home") {
    // home类型
    type = "home";
  } else if (typeof url === "number" || url === "back") {
    // back类型
    type = "back";
    delta = url > 0 ? url : 1;
  } else if (HttpReg.test(url)) {
    // http & https 链接
    type = 'webview'
  } else if (ThirdMiniReg.test(url)) {
    // 第三方小程序
    type = 'navigateToMiniProgram'
  } else if (options && options.appId) {
    if (SelfAppid === options.appId) {
      // 自己原生页面 是否区分 mini 和tab 页面 todo
      type = 'page' // page & mini
    } else {
      type = 'configToMini'
    }
  }
  if (data) {
    //   对象拼接参数
    url += (url.indexOf("?") < 0 ? "?" : "&") + _param(data);
  }
  console.log(
    `----------pageHref url:${url} type:${type} delta:${delta}------------`
  );
  switch (type) {
    case "page":
      return uni.navigateTo({
        url: url
      });
    case "back":
      return uni.navigateBack({
        delta: delta
      });
    case "tab":
      return uni.switchTab({
        url: url
      });
    case "home":
      return uni.navigateTo({
        url: homePath
      });
    case "redirect":
      return uni.redirectTo({
        url: url
      });
    case "reLaunch":
      return uni.reLaunch({
        url: url
      });
    case "webview":
      return uni.navigateTo({
        url: `/pages/webview/index?url=${encodeURIComponent(url)}`
      });
    case "configToMini":
      if (!options.appId || !url) {
        toast("configToMini 参数错误");
        return false;
      }
      uni.navigateToMiniProgram({
        appId: options.appId,
        path: url,
        extraData: {
          ...options,
        },
      });
      break;
    case "navigateToMiniProgram":
      let _urlParams = getUrlParams(url)
      if (!_urlParams.appId || !_urlParams.path) {
        toast("navigateToMiniProgram 参数错误");
        return false;
      }
      uni.navigateToMiniProgram({
        appId: _urlParams.appId,
        path: _urlParams.path,
        extraData: {
          ...options,
        },
      });
      break;
    default:
      uni.navigateTo({
        url: homePath
      });
      break;
  }

  function _param(data) {
    let url = "";
    for (var k in data) {
      let value = data[k] !== undefined ? data[k] : "";
      url += "&" + k + "=" + encodeURIComponent(value);
    }
    return url ? url.substring(1) : "";
  }
}

/**
 * setNavigationBarTitle 动态设置标题
 * @param {String} title
 * @returns {Boolean} true \ false
 */
function setNavigationBarTitle(title = "标题") {
  if (title) {
    uni.setNavigationBarTitle({
      title,
    });
    return true;
  }
  console.warn("设置标题不能为空");
  return false
}

/**
 * upDataLocation 更新经纬度
 * @param {String} title
 * @returns {Boolean} true \ false
 * 默认为 wgs84 返回 gps 坐标，gcj02 返回国测局坐标
 */

function upDataLocation(type = 'wgs84') {
  return new Promise((resolve) => {
    uni.getLocation({
      type,
      success(res) {
        console.log(res)
        store.commit("setLbs", res);
        resolve(res)
      },
      fail() {
        console.log('=====是否授权定位===-false')
        resolve(null)
      }
    })
  })
}

/**
 * openFile 打开文件，支持pdf xlsx doc等
 * @param {String} 文件url  文件名 
 * @returns {String}
 * eg: this.openFile("https://b.leka.club/table.xlsx", "table.xlsx");
 * 限制多次点击 todo
 */
function openFile(fileUrl = "", filename = "table.xlsx") {
  // #ifdef H5
  window.location.href = fileUrl;
  // #endif
  // #ifdef MP-WEIXIN
  //处理pdf的后缀名
  uni.showLoading({
    title: 'loading'
  });
  const fileReg = /\.pdf$|\.xlsx$|\.doc$|\.docx$|\.xls$/i;
  filename = filename.trim();
  if (!fileReg.test(filename)) {
    toast("warn 需要设置文件格式，默认打开xlsx");
    filename = `${filename}.xlsx`;
  }
  wx.downloadFile({
    url: fileUrl || "https://huolala.cn/table.xlsx",
    filePath: `${wx.env.USER_DATA_PATH}/${filename}`,
    success: function (res) {
      wx.openDocument({
        filePath: res.filePath,
        showMenu: true,
        success: function () {
          uni.hideLoading();
        },
        fail: function () {
          uni.hideLoading();
          toast("文件打开失败");
        },
      });
    },
    fail: function () {
      toast("文件下载失败");
    },
  });
  // #endif
}

/**
 * writeBufferFile 写入文件并打开文件 base64数据流
 * @param {String} base64Data  文件名
 * @returns {String}
 */
function writeBufferFile(base64Data = "", filename = "table.xlsx") {
  // #ifdef H5
  _downloadFileH5(base64Data, filename);
  // #endif
  // #ifdef MP-WEIXIN
  //处理pdf的后缀名
  const fileReg = /\.pdf$|\.xlsx$|\.doc$|\.docx$|\.xls$/i;
  filename = filename.trim();
  if (!fileReg.test(filename)) {
    toast("warn 需要设置文件格式，默认打开xlsx");
    filename = `${filename}.xlsx`;
  }
  const _fsm = wx.getFileSystemManager();
  _fsm &&
    _fsm.writeFile({
      filePath: `${wx.env.USER_DATA_PATH}/${filename}`,
      data: wx.base64ToArrayBuffer(base64Data),
      encoding: "utf8",
      success: function (e) {
        wx.openDocument({
          filePath: `${wx.env.USER_DATA_PATH}/${filename}`,
          showMenu: true,
          success: function () {},
          fail: function () {
            toast("文件打开失败");
          },
        });
      },
      fail: function (e) {
        if (e && e.errMsg) {
          toast((e && e.errMsg) || "文件写入失败");
        }
      },
      complete: function () {},
    });
  // #endif
  //   h5 浏览器dom
  function _downloadFileH5(content, fileName) {
    let base64ToBlob = function (code) {
      let _base64Data = code;
      let contentType = "text/plain";
      if (code.indexOf(";base64") > -1) {
        let _parts = code.split(";base64,");
        _base64Data = _parts[1];
        contentType = _parts[0].split(":")[1];
      }
      let raw = window.atob(content);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {
        type: contentType,
      });
    };
    let aLink = document.createElement("a");
    let blob = base64ToBlob(content);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
  }
}
const throttlePageHref = throttle(pageHref, 250)

/**
 * handle 处理配置返回数据的逻辑情况
 * @param {String} title
 * @returns {Boolean} true \ false
 */
function handleResJump(item = {}) {
  if (item.action_link) {
    item.name ?
      throttlePageHref(item.action_link, "", {
        title: item.name,
        appId: item.wx_link_id,
      }) :
      throttlePageHref(item.action_link, "", {
        appId: item.wx_link_id,
      });
  } else if (item.content_text) {
    // 没有跳转链接，展示建设中
    toast(item.content_text);
  }
  return false
}

module.exports = {
  toast,
  pageHref,
  setNavigationBarTitle,
  openFile,
  writeBufferFile,
  upDataLocation,
  throttlePageHref,
  handleResJump
};