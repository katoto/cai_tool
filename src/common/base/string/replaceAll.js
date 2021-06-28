/**
 * 替换所有匹配的字符/字符串
 * @param {String} instr 输入的字符串
 * @param {String} regexp 需要替换的字符/字符串
 * @param {String} replacement 替换的字符/字符串
 * @return {String} 替换后的字符串
 */
const replaceAll = (instr, regexp, replacement) => {
  let pattern = new RegExp(regexp, 'gm')
  let tmp = instr.replace(pattern, replacement)
  pattern = null
  return tmp
}

export default replaceAll
