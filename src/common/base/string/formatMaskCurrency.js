/* eslint-disable no-useless-escape */
/**
 * 千分位格式化
 * @param {String} currency 货币金额
 * @param {Boolean} trimTailZero 是否过滤小数位后的未尾0
 * @return {String} 转换后的货币
 */
const formatMaskCurrency = (currency, trimTailZero) => {
  if (null == currency) {
    return '??'
  }
	if(typeof currency == 'number') {
		currency = currency.toString()
	}
  let dotIndex = -1
  let hasDot = -1 != (dotIndex = currency.indexOf('.'))
  let prefix = hasDot ? currency.substring(0, dotIndex) : currency
  let suffix = hasDot ? currency.substring(dotIndex) : ''

  if (suffix.length > 0 && true == trimTailZero) {
    suffix = suffix.replace(/0+$/g, '')
    if ('.' == suffix) {
      suffix = ''
    }
  }

  let formatCurrent =
    prefix.replace(/([a-zA-Z\d\?\*])(?=(?:[a-zA-Z\d\?\*]{3})+$)/g, '$1,') +
    suffix

  return formatCurrent
}

export default formatMaskCurrency
