function _parseUrlStringParametersToObject(url) {
  let stringParameters = url.split("?")[1];
  let o = {};
  if (stringParameters) {
    for (const item of stringParameters.split("&")) {
      let [k, value] = item.split("=");
      if (value && value.includes("#")) {
        value = value.split("#")[0];
      }
      value = value ? decodeURIComponent(value) : undefined;
      if (o[k]) {
        o[k] = [].concat(o[k], value);
      } else {
        o[k] = value;
      }
    }
  }
  return o;
}

function _getCurrentPageOption() {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  return currentPage ? currentPage.options || {} : {};
}

function getUrlParameters(url, key) {
  let parametersObject = {};
  if ((window && window.location) || url) {
    url = url || window.location.href;
    parametersObject = _parseUrlStringParametersToObject(url);
  } else {
    parametersObject = _getCurrentPageOption();
  }
  if (key) {
    return parametersObject[key]
      ? decodeURIComponent(parametersObject[key])
      : undefined;
  }
  return parametersObject;
}

export default getUrlParameters;
