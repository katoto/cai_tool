/**
 * 手机号校验
 * @param {String} value 输入的字符串
 * @return {Bool} 是否手机号
 */
const isMobile = (value = '') => {
  return /^(1|9)\d{10}$/.test(value)
}

export default isMobile
