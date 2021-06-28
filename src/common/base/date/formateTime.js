/**
 * @func formateTime
 * @desc  时间格式化
 * @param {String|Number} - time 传入时间戳"毫秒"单位
 * @param {String} - yyyy|MM|dd|HH|mm|ss|AMPM|week 支持以上几种
 * @return 格式化之后的字符串
 */
function formateTime(time, format = "MM-dd HH:mm:ss") {
  time = Number(time);
  if (isNaN(time)) {
    return false;
  }
  let t = new Date(time);
  let _tf = function(i) {
    return (i < 10 ? "0" : "") + i;
  };
  let _tfAMPM = function(i) {
    if (~format.indexOf("AMPM")) {
      i = i % 12;
      i = i || 12;
    }
    return (i < 10 ? "0" : "") + i;
  };
  let _amName = function(hour) {
    return hour >= 12 ? "PM" : "AM";
  };
  let _getWeek = function(day) {
    let baseArr = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    return baseArr[day];
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss|AMPM|week/g, function(a) {
    switch (a) {
      case "yyyy":
        return _tf(t.getFullYear());
      case "MM":
        return _tf(t.getMonth() + 1);
      case "mm":
        return _tf(t.getMinutes());
      case "dd":
        return _tf(t.getDate());
      case "HH":
        return _tfAMPM(t.getHours());
      case "ss":
        return _tf(t.getSeconds());
      case "AMPM":
        return _amName(t.getHours());
      case "week":
        return _getWeek(t.getDay());
    }
  });
}

export default formateTime;
