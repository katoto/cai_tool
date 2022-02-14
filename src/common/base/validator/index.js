import isMobile from "./isMobile.js";
import isQQ from "./isQQ.js";
import isValidEmail from "./isValidEmail.js";

/**
 * 检测链接https
 * @param {String} url 链接
 * @return {Bool} 是否是https:// 开头的链接
 */
 const isHttpsLink = (url = "") => {
  const HttpReg = /^https:\/\/\w+/; //
  return HttpReg.test(url);
};

/**
 * 检测链接httphttps 开头的链接
 * @param {String} url 链接
 * @return {Bool} 是否是http:// ｜ https:// 开头的链接
 */
const isWebLink = (url = "") => {
  const HttpReg = /^(http|https):\/\/\w+/; //
  return HttpReg.test(url);
};

module.exports = {
  isMobile,
  isQQ,
  isValidEmail,
  isHttpsLink,
  isWebLink
};
