/**
 * @func removeParam
 * @desc  替换url上的某个参数
 * @param {string} url url链接
 * @param {string} paramName 删除的参数名
 * @return {string} 替换后的url
 */
const removeParameter = (url, parameterName) => {
  var urlparts = url.split("?");
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameterName) + "=";
    var pars = urlparts[1].split(/[&;]/g);

    for (var index = pars.length; index-- > 0; ) {
      if (pars[index].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(index, 1);
      }
    }

    return urlparts[0] + (pars.length > 0 ? "?" + pars.join("&") : "");
  }
  return url;
};

export default removeParameter;
