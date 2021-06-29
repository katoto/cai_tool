// 业务工具库
// base 基础工具函数
// import store from "@/store/index.js";
import { isObject } from "../base/index";
import { network } from "./network";

/**
 * getResponseList 获取资源列表
 * @param {String} positions 资源id
 * @returns {Boolean} reslist
 *
 */
function getResponseList(positions = "home_page_banner") {
  return network(
    "/api",
    {
      name: "resource.list",
      data: {
        positions,
        deviceId: ""
      }
    },
    {
      limitSys: ["deviceType", "token", "longitude", "latitude"]
    }
  ).then(response => {
    if (response && response.data && isObject(response.data)) {
      let _keysArray = Object.keys(response.data);
      if (_keysArray && _keysArray.length > 0) {
        return response.data[_keysArray[0]];
      }
      return [];
    }
    return [];
  });
}

module.exports = {
  getResponseList
};
