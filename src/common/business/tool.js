// 业务工具库
// base 基础工具函数
import {
  merge
} from "../base/index";
import store from "@/store/index.js";

/**
 * toast options 详见uni.showToast
 * @param {String}
 * @returns {String}
 */
let toastTimer;
function toast(message = "toast", options = {}, duration = 2500) {
  let _current = {
    title: message,
    icon: "none",
    duration: duration
  };
  store.commit("setLoadingFlag", "1");
  toastTimer && clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    store.commit("setLoadingFlag", "0");
  }, duration);

  return uni.showToast(merge(_current, options));
}

/**
 * setNavigationBarTitle 动态设置标题
 * @param {String} title
 * @returns {Boolean} true \ false
 */
function setNavigationBarTitle(title = "标题") {
  if (title) {
    uni.setNavigationBarTitle({
      title
    });
    return true;
  }
  console.warn("设置标题不能为空");
  return false;
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
    title: "loading"
  });
  const fileReg = /\.pdf$|\.xlsx$|\.doc$|\.docx$|\.xls$/i;
  filename = filename.trim();
  if (!fileReg.test(filename)) {
    toast("warn 需要设置文件格式，默认打开xlsx");
    filename = `${filename}.xlsx`;
  }
  wx.downloadFile({
    url: fileUrl || "https://xxx/table.xlsx",
    filePath: `${wx.env.USER_DATA_PATH}/${filename}`,
    success: function (response) {
      wx.openDocument({
        filePath: response.filePath,
        showMenu: true,
        success: function () {
          uni.hideLoading();
        },
        fail: function () {
          uni.hideLoading();
          toast("文件打开失败");
        }
      });
    },
    fail: function () {
      toast("文件下载失败");
    }
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
      success: function () {
        wx.openDocument({
          filePath: `${wx.env.USER_DATA_PATH}/${filename}`,
          showMenu: true,
          success: function () {},
          fail: function () {
            toast("文件打开失败");
          }
        });
      },
      fail: function (error) {
        if (error && error.errMsg) {
          toast((error && error.errMsg) || "文件写入失败");
        }
      },
      complete: function () {}
    });
  // #endif
}

//   h5 浏览器dom
function _downloadFileH5(content, fileName) {
  let base64ToBlob = function (code) {
    let contentType = "text/plain";
    if (code.includes(";base64")) {
      let _parts = code.split(";base64,");
      contentType = _parts[0].split(":")[1];
    }
    let raw = window.atob(content);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let index = 0; index < rawLength; ++index) {
      uInt8Array[index] = raw.charCodeAt(index);
    }
    return new Blob([uInt8Array], {
      type: contentType
    });
  };
  let aLink = document.createElement("a");
  let blob = base64ToBlob(content);
  let event_ = document.createEvent("HTMLEvents");
  event_.initEvent("click", true, true); //阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
}

module.exports = {
  toast,
  setNavigationBarTitle,
  openFile,
  writeBufferFile
};
