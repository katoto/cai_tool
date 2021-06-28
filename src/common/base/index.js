/**
 * datatype
 */
import datatype from "./datatype/index.js";
/**
 * date
 */
import date from "./date/index.js";
/**
 * string
 */
import string from "./string/index.js";
/**
 * url
 */
import url from "./url/index.js";
/**
 * validator
 */
import validator from "./validator/index.js";
/**
 * tool基础函数
 */
import tool from "./tool/index.js";

let utils = Object.assign({}, datatype, date, string, url, validator, tool);

module.exports = {
  ...utils
};
