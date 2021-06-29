/**
 * @func replaceParam
 * @desc  替换url上的某个参数
 * @param {string} url url链接
 * @param {string} paramName 替换的参数名
 * @param {string} replaceWith 替换的参数值
 * @return {string} 替换后的url
 */
const replaceParameter = (url, parameterName, replaceWith) => {
  var re = eval("/(" + parameterName + "=)([^&]*)/gi");
  var nUrl = url.replace(re, parameterName + "=" + replaceWith);
  return nUrl;
};

export default replaceParameter;
