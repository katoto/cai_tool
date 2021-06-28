"use strict";

/**
 * 检测函数 isFunction 等等
 * isString
 * isObject
 * isNumber
 * isArray
 * isUndefined
 * isNull
 * isSymbol
 * isFunction
 * @returns {Boolean}
 */
let dataType = (function () {
  let type = {};
  let typeArr = [
    "String",
    "Object",
    "Number",
    "Array",
    "Undefined",
    "Null",
    "Symbol",
    "Function"
  ];
  for (let i = 0; i < typeArr.length; i++) {
    type["is" + typeArr[i]] = function (obj) {
      return (
        Object.prototype.toString.call(obj) === "[object " + typeArr[i] + "]"
      );
    };
  }
  return type;
})();

module.exports = {
  ...dataType
};
