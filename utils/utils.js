function getBrowser() {
  var UA = navigator.userAgent.toLocaleLowerCase() || "";
  var isAndroid = UA.match(/Android/i) ? true : false;
  var isIOS = UA.match(/iPhone|iPad|iPod/i) ? true : false;
  var isIpone = UA.indexOf("iphone") > -1 ? true : false;
  var isSafari = /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA);
  // 微信
  var isWx = UA.match(/micromessenger/i) ? true : false;
  // 微博
  return {
    isAndroid,
    isIOS,
    isSafari,
    isWx,
    isIpone
  };
}

function httpAjax(opt) {
  opt = opt || {};
  var type = opt.type || "GET";
  type = type.toUpperCase() || "GET";
  var url = opt.url || "";
  var async = opt.async || true;
  var data = opt.data || null;
  var header = opt.header || [];
  var success = opt.success || function () {};
  var fail = opt.fail || function () {};
  var xmlHttp = null;
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  var params = [];
  for (var key in data) {
    params.push(key + "=" + data[key]);
  }
  var dataStr = params.join("&");
  if (type === "POST") {
    xmlHttp.open(type, url, async);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    // xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    // xmlHttp.setRequestHeader('Content-Type', 'multipart/form-data;charset=utf-8');
    for (let head of header) {
      xmlHttp.setRequestHeader(head.name, head.value);
    }
    data = JSON.stringify(data);
    xmlHttp.send(data);
  } else {
    url = url + (url.indexOf("?") > -1 ? "&" : "?") + dataStr;
    xmlHttp.open(type, url, async);
    for (let head of header) {
      xmlHttp.setRequestHeader(head.name, head.value);
    }
    xmlHttp.send(null);
  }
  xmlHttp.onreadystatechange = function (err) {
    if (xmlHttp.readyState == 4) {
      var status = xmlHttp.status;
      if (status >= 200 && status < 300) {
        success && success(xmlHttp.responseText);
      } else {
        fail && fail(status);
      }
    }
  };
}

function getQuery(str) {
  // url转obj
  if (!str) {
    str = location.search.substring(1);
  }
  const queryObj = str
    ? JSON.parse(
        '{"' + str.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        }
      )
    : {};
  // const getQuery = url => [...new URL(url).searchParams].reduce((pre,[key,value])=>Object.assign(pre,{[key]: value}),Object.create(null));
  return queryObj;
}

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function hasClass(ele, cls) {
  return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
function addClass(ele, cls) {
  if (!this.hasClass(ele, cls)) ele.className += " " + cls;
}
function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}
function toggleClass(ele, cls) {
  if (hasClass(ele, cls)) {
    removeClass(ele, cls);
  } else {
    addClass(ele, cls);
  }
}

function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("").replace(/-/g, "");
  return uuid;
}

/**
 * url参数拼接
 * @export
 * @param {String} url
 * @param {Object} params ： {xxx:xxx}
 * @returns String;
 */
function splicingUrl(url, params) {
  const paramsArray = [];
  Object.keys(params).forEach(key => {
    if (
      Object.prototype.toString.call(params[key]) === "[object Array]" &&
      params[key].length > 0
    ) {
      params[key].forEach(data => {
        paramsArray.push(`${key}[]=${data}`);
      });
    } else {
      params[key] && paramsArray.push(`${key}=${params[key]}`);
    }
  });
  if (url.search(/\?/) === -1) {
    url += `?${paramsArray.join("&")}`;
  } else {
    url += `&${paramsArray.join("&")}`;
  }
  return url;
}
