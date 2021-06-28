/**
 * @func joinParams
 * @desc  拼接参数
 * @param {string}  href url链接
 * @param {Obj}  params 待拼接参数
 * @return {string} 拼接后的字符串
 */
const joinParams = (href, params) => {
  var url = ''
  if (href.indexOf('?') < 0) {
    url = url.concat(href, '?')
  } else {
    url = url.concat(href, '&')
  }
  for (var key in params) {
    if (key == 'undefined' || !key) {
      continue
    } else {
      url = url.concat(key, '=', encodeURIComponent(params[key]), '&')
    }
  }
  url = url.substr(0, url.length - 1)
  return url
}

export default joinParams
