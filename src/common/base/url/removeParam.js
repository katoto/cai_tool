/**
 * @func removeParam
 * @desc  替换url上的某个参数
 * @param {string} url url链接
 * @param {string} paramName 删除的参数名
 * @return {string} 替换后的url
 */
const removeParam = (url, paramName) => {
  var urlparts = url.split('?')
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(paramName) + '='
    var pars = urlparts[1].split(/[&;]/g)

    for (var i = pars.length; i-- > 0; ) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1)
      }
    }

    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
  }
  return url
}

export default removeParam
