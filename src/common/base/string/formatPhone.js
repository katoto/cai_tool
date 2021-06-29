/**
 * 手机号格式化
 * @param {String} instr 输入的字符串
 * @return {String} 格式化后的字符串
 */
const formatPhone = instr => {
  var string = instr.replace(/ /g, "");
  let length_ = string.length;
  switch (true) {
    case length_ > 11:
      string =
        string.slice(0, 3) +
        " " +
        string.slice(3, 7) +
        " " +
        string.slice(7, 11);
      break;
    case length_ > 7:
      string =
        string.slice(0, 3) + " " + string.slice(3, 7) + " " + string.slice(7);
      break;
    case length_ > 3:
      string = string.slice(0, 3) + " " + string.slice(3);
      break;
    default:
      string = instr;
  }

  return string;
};

export default formatPhone;
