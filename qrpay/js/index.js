window.onload = function () {
  if (!Array.prototype.find) {
    Array.prototype.find = function (fn, context) {
      let str;
      if (typeof fn !== "function") {
        throw new TypeError(fn + "is not a function");
      }
      var context = arguments[1];
      for (var i = 0; i < this.length; i++) {
        if (fn.call(context, this[i], i, this)) {
          str = this[i];
          break;
        }
      }
      return str;
    };
  }
  var initQrcode = function (url) {
    qrcode = new QRCode(document.getElementById("qrcode-pay"), {
      text: url,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  };
  // var vConsole = new VConsole();
  // var queryObj = getQuery();

  var url = window.location.href;
  if (
    url.slice(7, 10) === "dev" ||
    url.slice(7, 10) === "192" ||
    url.slice(7, 10) === "127"
  ) {
    /* 开发线 */
    var appId = "10000"; // 唯一标识 dev
    var merchantId = "1294178599210422274"; // 商户ID dev
    var baseUrl = "http://192.168.10.203:8889"; // dev
    var coinName = "CLC"; // 	币种名称 dev
    var secretKey = "WkYe28Hlu0N1n6YRx/pWww==";
  } else if (url.slice(7, 11) === "test") {
    /* 测试线 */
    var appId = "10000"; // 唯一标识 test
    var merchantId = "1300742540970475522"; // 商户ID test
    var baseUrl = "http://192.168.10.213:8889"; // master test
    var coinName = "CLC"; // 	币种名称 test
    var secretKey = "KDuTsWeAikOFbO+P70CE7A=="; // 下单签名秘钥
  } else {
    /* 正式线 */
    var appId = "10000"; // 唯一标识 master
    var merchantId = "1306062901528584194"; // 商户ID master
    var baseUrl = "https://demo-api.hailuo.im"; // master
    var coinName = "CLC"; // 	币种名称 master
    var secretKey = "We7/KfVPtJdGnx/jqZzv2A=="; // 下单签名秘钥
  }
  /* 接口入参 */
  var amount = "2"; // 提币金额

  var placeOrder = function (successCallback, failCallback) {
    var data = {
      amount: amount,
      appKey: appId,
      attach: "测试商户下单", // 附加数据
      coinName: coinName,
      expireTime: 7200, // 交易结束时间 单位分钟
      orderNo: Date.now(), // 商户系统内部订单号
      payScenes: 3, // 支付场景 1：APP 2: H5 3:NATIVE
      productDesc: "商品说明", // 商品说明
      thirdPartyRemarks: "测试支付" + amount + coinName, // 支付备注
      thirdPartyTimestamp: Date.now(),
      // 仅用于demo，便于后端生成唯一key
      secretKey: secretKey
    };
    // 获取签名 => 下单
    httpAjax({
      type: "POST",
      url: baseUrl + "/sdk/order/sign",
      data: data,
      success: function (res) {
        var result = JSON.parse(res);
        if (!result.success) {
          alert(result.msg);
          return;
        }
        httpAjax({
          type: "POST",
          url: baseUrl + "/sdk/order/place",
          data: result.data,
          success: function (res) {
            document.querySelector(".loading-wrap").style.display = "none";
            successCallback && successCallback(res);
          },
          fail: function (err) {
            document.querySelector(".loading-wrap").style.display = "none";
            failCallback && failCallback(err);
          }
        });
      },
      fail: function (err) {
        document.querySelector(".loading-wrap").style.display = "none";
        alert("签名失败");
      }
    });
  };
  var startBtnWrapper = document.querySelector("#start-pay-btn-wrapper");
  var startBtn = document.querySelector("#start-pay-btn");
  var qrcodePayWrapper = document.querySelector("#qrcode-pay-wrapper");
  var payCompeletedBtn = document.querySelector("#pay-compeleted-btn");
  var payTips = document.querySelector("#pay-tips");
  startBtn.onclick = function () {
    var _this = this;
    _this.disabled = true;

    document.querySelector(".loading-wrap").style.display = "block";
    placeOrder(
      function (res) {
        var result = JSON.parse(res);
        var data = result.data;
        if (!result.success) {
          _this.disabled = false;
          alert(result.msg);
          return;
        }
        orderId = data.id;
        var codeUrl = data.codeUrl;
        _this.disabled = false;
        removeClass(qrcodePayWrapper, "hidden");
        addClass(startBtnWrapper, "hidden");
        initQrcode(codeUrl);
      },
      function (err) {
        alert("调用sdk失败");
      }
    );
  };
  var checkOrderStatus = function (successCallback, failCallback) {
    httpAjax({
      type: "POST",
      url: baseUrl + "/sdk/order/orderDetail",
      data: {
        appId: appId,
        merchantId: merchantId,
        orderId: orderId
      },
      success: function (res) {
        successCallback && successCallback(res);
      },
      fail: function (err) {
        failCallback && failCallback(err);
      }
    });
  };

  payCompeletedBtn.onclick = function () {
    var _this = this;
    _this.disabled = true;
    checkOrderStatus(
      function (res) {
        var result = JSON.parse(res);
        if (!result.success) {
          _this.disabled = false;
          alert(result.msg);
          return;
        }
        var transferStatus = result.data.transferStatus;
        var statusConfig = [
          {
            value: 1,
            label: "待支付"
          },
          {
            value: 2,
            label: "支付中"
          },
          {
            value: 3,
            label: "支付完成"
          }
        ];
        var current = statusConfig.find(v => v.value === transferStatus);
        if (current) {
          payTips.innerHTML = current.label;
          // 支付成功的时候 隐藏二维码
          if (transferStatus === 3) {
            addClass(qrcodePayWrapper, "hidden");
          }
          removeClass(payTips, "hidden");
          _this.disabled = false;
        }
      },
      function () {
        payTips.innerHTML = "支付失败";
        removeClass(payTips, "hidden");
      }
    );
  };
};
