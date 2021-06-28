/**
 * qq号校验，5-18位数字
 * @param {String} value 输入的字符串
 * @return {Bool} 是否qq号
 */
const isQQ = value => {
  return /^\d{5,18}$/.test(value)
}

export default isQQ
