/**
 * @func joinParams
 * @desc  拼接参数
 * @param {string}  href url链接
 * @param {Obj}  params 待拼接参数
 * @return {string} 拼接后的字符串
 */
const joinParameters = (href, parameters) => {
  var url = "";
  url = !href.includes("?") ? url.concat(href, "?") : url.concat(href, "&");
  for (var key in parameters) {
    if (key == "undefined" || !key) {
      continue;
    } else {
      url = url.concat(key, "=", encodeURIComponent(parameters[key]), "&");
    }
  }
  url = url.slice(0, Math.max(0, url.length - 1));
  return url;
};

export default joinParameters;
