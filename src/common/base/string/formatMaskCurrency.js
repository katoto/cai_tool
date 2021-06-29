/* eslint-disable no-useless-escape */
/**
 * 千分位格式化
 * @param {String} currency 货币金额
 * @param {Boolean} trimTailZero 是否过滤小数位后的未尾0
 * @return {String} 转换后的货币
 */
const formatMaskCurrency = (currency, trimTailZero) => {
  if (undefined == currency) {
    return "??";
  }
  if (typeof currency == "number") {
    currency = currency.toString();
  }
  let dotIndex = -1;
  let hasDot = -1 != (dotIndex = currency.indexOf("."));
  let prefix = hasDot ? currency.slice(0, Math.max(0, dotIndex)) : currency;
  let suffix = hasDot ? currency.slice(Math.max(0, dotIndex)) : "";

  if (suffix.length > 0 && true == trimTailZero) {
    suffix = suffix.replace(/0+$/g, "");
    if ("." == suffix) {
      suffix = "";
    }
  }

  let formatCurrent =
    prefix.replace(/([\d*?A-Za-z])(?=(?:[\d*?A-Za-z]{3})+$)/g, "$1,") + suffix;

  return formatCurrent;
};

export default formatMaskCurrency;
