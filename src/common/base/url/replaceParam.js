/**
 * @func replaceParam
 * @desc  替换url上的某个参数
 * @param {string} url url链接
 * @param {string} paramName 替换的参数名
 * @param {string} replaceWith 替换的参数值
 * @return {string} 替换后的url
 */
const replaceParam = (url, paramName, replaceWith) => {
  var re = eval('/(' + paramName + '=)([^&]*)/gi')
  var nUrl = url.replace(re, paramName + '=' + replaceWith)
  return nUrl
}

export default replaceParam
