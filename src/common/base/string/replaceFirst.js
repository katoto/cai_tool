/**
 * 替换第一次匹配的字符/字符串
 * @param {String} instr 输入的字符串
 * @param {String} regexp 需要替换的字符/字符串
 * @param {String} replacement 替换的字符/字符串
 * @return {String} 替换后的字符串
 */
const replaceFirst = (instr, regexp, replacement) => {
  let group = new RegExp('(' + regexp + ')', 'gm').exec(instr)
  let tmp = instr
  if (null !== group) {
    tmp = instr
      .substring(0, group.index)
      .concat(replacement)
      .concat(instr.substring(group.index + group[1].length))
  }
  group = null
  return tmp
}

export default replaceFirst
