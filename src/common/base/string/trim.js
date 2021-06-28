/**
 * 去两端空字符
 * @param {String} instr 输入的字符串
 * @return {String} 去空后的字符串
 */
const trim = instr => {
  let pattern = /^([\s ]+)|([\s ]+)$/gim
  let tmp = instr.replace(pattern, '')
  pattern = null
  return tmp
}

export default trim
