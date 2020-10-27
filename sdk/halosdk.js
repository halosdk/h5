"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

window.getHaloSdk = (function (win, doc, xhr) {
  return function (config) {
    return new Authorization(config);
  };
})(window, document, XMLHttpRequest);

var Authorization = /*#__PURE__*/ (function () {
  function Authorization() {
    var config =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Authorization);

    this.merchantId = config.merchantId || ""; // 商户ID

    this.openId = config.openId || ""; // 同一主体下用户唯一标识

    this.appId = config.appId || ""; // 唯一标识

    this.accessToken = config.accessToken || ""; // accessToken

    this.responseType = config.responseType || "";
    this.scope = config.scope || ""; // 授权作用域

    this.refreshToken = config.refreshToken || ""; // 用户刷新accessToken

    this.coinName = config.coinName || ""; // 币种

    this.amount = config.amount || ""; // 提币金额

    this.remark = config.remark || ""; // 提款备注

    this.navMode = "1"; // 普通(外来链接)默认是0 ，sdk授权是1

    this.navTitle = config.navTitle || ""; // 标题

    this.navFontSize = config.navFontSize || "18"; // 字体大小

    this.navFontColor = config.navFontColor || "#0A0B13"; // 字体颜色

    this.navBgColor = config.navBgColor || "#ffffff"; // 背景颜色

    this.navIconMode = config.navIconMode || "0"; // 导航栏按键颜色(0是默认颜色，1是浅色)
  } // 自定义导航栏标题、字体颜色和大小、背景颜色
  // setNavigation(getData) {
  //   const isIphone = this.scanProduct().isIphone;
  //   console.log("123", getData);
  //   const data = JSON.stringify({
  //     navMode: getData.navMode || this.navMode,
  //     navTitle: getData.navTitle || this.navTitle,
  //     navFontSize: getData.navFontSize || this.navFontSize,
  //     navFontColor: getData.navFontColor || this.navFontColor,
  //     navBgColor: getData.navBgColor || this.navBgColor,
  //     navIconMode: getData.navIconMode || this.navIconMode
  //   });
  //   if (isIphone) {
  //     console.log("window.webkit.messageHandlers.setTitle.postMessage", data);
  //     window.webkit.messageHandlers.setTitle.postMessage(data); // 调用IOS客户端方法
  //     window.webkit.messageHandlers.isAuthentication.postMessage(true);
  //     return;
  //   }
  //   console.log("setTitle", data);
  //   messageHandlers.setTitle(data); // 调用安卓客户端方法
  //   messageHandlers.isAuthentication(true); // 弹窗
  // }

  _createClass(Authorization, [
    {
      key: "verify",
      value: function verify(argArr, dataObj) {
        for (var i = 0; i < argArr.length; i++) {
          var arg = argArr[i];

          if (!dataObj[arg]) {
            console.error("Parameter does not exist\uFF1A ".concat(arg));
            return false;
          }
        }

        return true;
      } // 授权
    },
    {
      key: "authorization",
      value: function authorization(authorizationData) {
        // 参数校验
        if (
          !this.verify(["appId", "responseType", "scope"], authorizationData)
        ) {
          return;
        }

        var isIphone = this.scanProduct().isIphone;
        var data = JSON.stringify({
          type: "7",
          appId: authorizationData.appId || this.appId,
          responseType: authorizationData.responseType,
          scope: authorizationData.scope
        });

        if (isIphone) {
          console.log("window.webkit.messageHandlers.action.postMessage", data);
          window.webkit.messageHandlers.action.postMessage(data);
          return;
        }

        console.log("action-authorization", data);
        messageHandlers.action(data); // 调用安卓客户端方法
      } // 充值
    },
    {
      key: "recharge",
      value: function recharge(rechargeData, rechargeSuccess, rechargeFail) {
        // 参数校验
        if (
          !this.verify(
            [
              "merchantId",
              "appId",
              "openId",
              "coinName",
              "amount",
              "outTradeNo",
              "remark",
              "accessToken",
              "merchant"
            ],
            rechargeData
          )
        ) {
          return;
        }

        var isIphone = this.scanProduct().isIphone;
        var data = JSON.stringify(
          _objectSpread(
            {
              type: "8"
            },
            rechargeData
          )
        );

        if (isIphone) {
          console.log("action-recharge", data);
          window.webkit.messageHandlers.action.postMessage(data);
        } else {
          console.log("action-recharge", data);
          messageHandlers.action(data);
        }

        return;
      } // 支付
    },
    {
      key: "repay",
      value: function repay(repayData) {
        // 参数校验
        if (
          !this.verify(
            [
              "orderId",
              "scanType",
              "orderNo",
              "payAmount",
              "payCoinName",
              "id",
              "status",
              "merchantName"
            ],
            repayData
          )
        ) {
          return;
        }

        var isIphone = this.scanProduct().isIphone;
        var data = JSON.stringify(
          _objectSpread(
            {
              type: "6"
            },
            repayData
          )
        );

        if (isIphone) {
          console.log("action-pay", data);
          window.webkit.messageHandlers.action.postMessage(data);
        } else {
          console.log("action-pay", data);
          messageHandlers.action(data);
        }

        return;
      } // 销毁
    },
    {
      key: "destroy",
      value: function destroy() {} // 唤醒客户端
    },
    {
      key: "callApp",
      value: function callApp(enData) {
        this.openInSdkWeb(enData); // this.openInner(enData);
      } // web打开uri
      // openInSdkWeb(enData) {
      //   location.href = `https://pay.secret.one/sdk/?sdk=${enData}&lang=${this.lang}`; // 正式线
      // }
      // app打开
      // openInner(enData) {
      //   const baseUrl = "secret.one://?pay=";
      //   const scheme = baseUrl + enData;
      //   location.href = scheme;
      // }

      /* 封装ajax函数
       * @param {string}opt.type http连接的方式，包括POST和GET两种方式，默认使用GET
       * @param {string}opt.url 发送请求的url
       * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
       * @param {object}opt.data 发送的参数，格式为对象类型
       * @param {function}opt.success ajax发送并接收成功调用的回调函数
       */
    },
    {
      key: "httpAjax",
      value: function httpAjax(opt) {
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
          xmlHttp.setRequestHeader(
            "Content-Type",
            "application/json;charset=utf-8"
          ); // xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
          // xmlHttp.setRequestHeader('Content-Type', 'multipart/form-data;charset=utf-8');

          var _iterator = _createForOfIteratorHelper(header),
            _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var head = _step.value;
              xmlHttp.setRequestHeader(head.name, head.value);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          data = JSON.stringify(data);
          xmlHttp.send(data);
        } else {
          url = url + (url.indexOf("?") > -1 ? "&" : "?") + dataStr;
          xmlHttp.open(type, url, async);

          var _iterator2 = _createForOfIteratorHelper(header),
            _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var _head = _step2.value;
              xmlHttp.setRequestHeader(_head.name, _head.value);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          xmlHttp.send(null);
        }

        xmlHttp.onreadystatechange = function () {
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
      /* 获取URLquery参数
       * @param  {string}str 要处理的query字符串
       * @return {object}{}  返回query对象
       */
    },
    {
      key: "getQuery",
      value: function getQuery(str) {
        // url转obj
        if (!str) {
          str = location.search.substring(1);
        }

        var query_scan = str
          ? JSON.parse(
              '{"' + str.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
              function (key, value) {
                return key === "" ? value : decodeURIComponent(value);
              }
            )
          : {};
        return query_scan;
      }
      /* 格式化浮点数
       * @param  {number}num 要处理的数值
       * @return {number}    处理后的数值
       */
    },
    {
      key: "numberStrip",
      value: function numberStrip() {
        var num =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var precision =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : 12;

        if (typeof num === "string") {
          var _num = Number(num);

          if (typeof _num !== "NaN") {
            num = _num;
          }
        }

        if (typeof num === "number") {
          return parseFloat(num.toPrecision(precision));
        }

        throw new Error(
          "Type Error;Hope Type: Number;" + "Get Type:" + _typeof(num)
        );
      }
      /* 浏览器环境检测
       * @return {object}    {isAndroid,isIphone,isWeixin}
       */
    },
    {
      key: "scanProduct",
      value: function scanProduct() {
        // js设备校验
        var obj = {};
        var ua = navigator.userAgent.toLowerCase();
        obj.isAndroid = /(Android)/i.test(navigator.userAgent); //android终端

        obj.isIphone = ua.indexOf("iphone") > -1 ? true : false; //ipone

        obj.isWeixin = ua.match(/MicroMessenger/i) == "micromessenger"; //微信

        return obj;
      }
    }
  ]);

  return Authorization;
})();
