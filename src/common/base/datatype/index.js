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
let dataType = (function() {
  let type = {};
  let typeArray = [
    "String",
    "Object",
    "Number",
    "Array",
    "Undefined",
    "Null",
    "Symbol",
    "Function"
  ];
  for (const element of typeArray) {
    type["is" + element] = function(object) {
      return (
        Object.prototype.toString.call(object) === "[object " + element + "]"
      );
    };
  }
  return type;
})();

module.exports = {
  ...dataType
};
