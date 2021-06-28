function _parseUrlStrParamsToObj(url) {
  let strParams = url.split("?")[1];
  let o = {};
  if (strParams) {
    strParams.split("&").forEach((item) => {
      let [k, val] = item.split("=");
      if (val && val.indexOf("#") > -1) {
        val = val.split("#")[0];
      }
      val = val ? decodeURIComponent(val) : undefined;
      if (o[k]) {
        o[k] = [].concat(o[k], val);
      } else {
        o[k] = val;
      }
    });
  }
  return o;
}

function _getCurPageOption() {
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  return curPage ? curPage.options || {} : {};
}

function getUrlParams(url, key) {
  let paramsObj = {};
  if ((window && window.location) || url) {
    url = url || window.location.href;
    paramsObj = _parseUrlStrParamsToObj(url);
  } else {
    paramsObj = _getCurPageOption();
  }
  if (key) {
    return paramsObj[key] ? decodeURIComponent(paramsObj[key]) : undefined;
  }
  return paramsObj;
}

export default getUrlParams;
