/**
 * 邮箱校验
 * @param {String} value 输入的字符串
 * @return {Bool} 是否邮箱
 */
const isValidEmail = (value = "") => {
  return /(\w+(?:[+.-]\w+)*)(@\w+([.-]\w+)*\.\w+([.-]\w+)*)/.test(value);
};

export default isValidEmail;
