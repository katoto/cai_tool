"use strict";
// 工具函数

/**
 * Example:
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};

  function assignValue(value, key) {
    if (typeof result[key] === "object" && typeof value === "object") {
      result[key] = merge(result[key], value);
    } else {
      result[key] = value;
    }
  }
  for (var index = 0, l = arguments.length; index < l; index++) {
    _forEach(arguments[index], assignValue);
  }
  return result;
}

/**
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};

  function assignValue(value, key) {
    if (typeof result[key] === "object" && typeof value === "object") {
      result[key] = deepMerge(result[key], value);
    } else if (typeof value === "object") {
      result[key] = deepMerge({}, value);
    } else {
      result[key] = value;
    }
  }

  for (var index = 0, l = arguments.length; index < l; index++) {
    _forEach(arguments[index], assignValue);
  }
  return result;
}

/**
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function _forEach(object, function_) {
  if (object === null || typeof object === "undefined") {
    return;
  }
  if (typeof object !== "object") {
    /*eslint no-param-reassign:0*/
    object = [object];
  }

  if (Array.isArray(object)) {
    // Iterate over array values
    for (var index = 0, l = object.length; index < l; index++) {
      function_.call(null, object[index], index, object);
    }
  } else {
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        function_.call(null, object[key], key, object);
      }
    }
  }
}

/**
 * 字符处理
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function escape(string) {
  if (string && typeof string === "string") {
    string = string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quto;")
      .replace(/'/g, "&#39;")
      .replace(/`/g, "&#96;")
      .replace(/\//g, "&#x2F;");
    return string;
  }
  return string;
}

/**
 * 节流 （立即执行）
 */
function throttle(function_, delay = 300) {
  let flag = true;
  return function() {
    if (flag) {
      flag = false;
      Reflect.apply(function_, this, arguments);
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}

module.exports = {
  merge,
  deepMerge,
  escape,
  throttle
};
