/**
 * 手机号格式化
 * @param {String} instr 输入的字符串
 * @return {String} 格式化后的字符串
 */
const formatPhone = instr => {
  var str = instr.replace(/ /g, '')
  let len = str.length
  switch (true) {
    case len > 11:
      str = str.substr(0, 3) + ' ' + str.substr(3, 4) + ' ' + str.substr(7, 4)
      break
    case len > 7:
      str = str.substr(0, 3) + ' ' + str.substr(3, 4) + ' ' + str.substr(7)
      break
    case len > 3:
      str = str.substr(0, 3) + ' ' + str.substr(3)
      break
    default:
      str = instr
  }

  return str
}

export default formatPhone
