window.onload = function () {
  var initQrcode = function (url) {
    qrcode = new QRCode(document.getElementById("qrcode-login"), {
      text: url,
      width: 220,
      height: 220,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  };
  // var vConsole = new VConsole();
  var queryObj = getQuery();

  var url = window.location.href;
  if (
    url.slice(7, 10) === "dev" ||
    url.slice(7, 10) === "192" ||
    url.slice(7, 10) === "127"
  ) {
    /* 开发线 */
    var appId = queryObj.appId || "10000"; // 唯一标识 dev
    var merchantId = "1294178599210422274"; // 商户ID dev
    var baseUrl = "http://192.168.10.203:8889"; // dev
    var coinName = "CLC"; // 	币种名称 dev
    var secretKey = "WkYe28Hlu0N1n6YRx/pWww==";
  } else if (url.slice(7, 11) === "test") {
    /* 测试线 */
    var appId = queryObj.appId || "10000"; // 唯一标识 test
    var merchantId = "1300742540970475522"; // 商户ID test
    var baseUrl = "http://192.168.10.213:8889"; // master test
    var coinName = "CLC"; // 	币种名称 test
    var secretKey = "KDuTsWeAikOFbO+P70CE7A=="; // 下单签名秘钥
  } else {
    /* 正式线 */
    var appId = queryObj.appId || "10000"; // 唯一标识 master
    var merchantId = "1306062901528584194"; // 商户ID master
    var baseUrl = "https://demo-api.hailuo.im"; // master
    var coinName = "CLC"; // 	币种名称 master
    var secretKey = "We7/KfVPtJdGnx/jqZzv2A=="; // 下单签名秘钥
  }
  var timer = null;
  // 入参
  if (url.slice(7, 10) === "192" || url.slice(7, 10) === "127") {
    var redirectUri = queryObj.redirectUri || location.origin;
  } else {
    var redirectUri = queryObj.redirectUri || location.origin + "/demo";
  }

  // 网页dom节点
  var qrcodeLoginWrapper = document.querySelector("#qrcode-login-wrapper");
  var qrcodeScanText = document.querySelector(
    "#qrcode-login-wrapper .qrcode-scan-text"
  );
  var qrcodeExpiredWrapper = document.querySelector(".qrcode-expired-wrapper");
  var qrcodeSuccessWrapper = document.querySelector(".qrcode-success-wrapper");
  var qrcodeErrorWrapper = document.querySelector(".qrcode-error-wrapper");
  var loadingWrap = document.querySelector(".loading-wrap");
  var refreshQrcodeBtn = document.querySelector(".refresh-qrcode");

  // 获取登录二维码
  var getLoginQrCode = function (key) {
    loadingWrap.style.display = "block";
    var data = {
      appId: appId,
      redirectUri: redirectUri
    };
    httpAjax({
      type: "POST",
      url: baseUrl + "/sdk/oauth2/qr/generate",
      data: data,
      success: function (res) {
        loadingWrap.style.display = "none";
        var result = JSON.parse(res);
        if (!result.success) {
          alert(result.msg);
          return;
        }
        const codejson = JSON.stringify({
          scanType: "7",
          qrCode: result.data.qrCode // 二维码code
        });
        if (key === "refresh") {
          qrcode.makeCode(codejson);
        } else {
          initQrcode(codejson);
        }
        removeClass(qrcodeScanText, "hidden");
        removeClass(qrcodeLoginWrapper, "hidden");
        setIntervalQrCode(result.data.qrCode);
      },
      fail: function (err) {
        loadingWrap.style.display = "none";
        alert("生成登录二维码失败");
      }
    });
  };
  getLoginQrCode();

  // 刷新登录二维码
  refreshQrcodeBtn.onclick = function () {
    addClass(qrcodeExpiredWrapper, "hidden");
    getLoginQrCode("refresh");
  };

  // 轮询获取二维码扫描状态
  var setIntervalQrCode = function (code) {
    timer = setInterval(function () {
      httpAjax({
        type: "POST",
        url: baseUrl + "/sdk/oauth2/qr/code",
        data: {
          appId: appId,
          qrCode: code
        },
        success: function (res) {
          var result = JSON.parse(res);
          if (!result.success) {
            alert(result.msg);
            location.reload();
            return;
          }
          getQrcodeStatus(result.data.status, result.data.code);
        },
        fail: function (err) {
          alert("生成登录二维码失败");
        }
      });
    }, 1000);
  };
  // 根据二维码状态处理对应事件
  var getQrcodeStatus = function (status, code) {
    switch (status) {
      case "1":
        removeClass(qrcodeSuccessWrapper, "hidden");
        addClass(qrcodeExpiredWrapper, "hidden");
        addClass(qrcodeErrorWrapper, "hidden");
        addClass(qrcodeScanText, "hidden");
        break;
      case "2":
        addClass(qrcodeSuccessWrapper, "hidden");
        addClass(qrcodeExpiredWrapper, "hidden");
        removeClass(qrcodeErrorWrapper, "hidden");
        addClass(qrcodeScanText, "hidden");
        break;
      case "3":
        clearInterval(timer);
        timer = null;
        window.location.href = splicingUrl(redirectUri, {
          code: code
        });
        break;
      case "4":
        clearInterval(timer);
        timer = null;
        addClass(qrcodeLoginWrapper, "hidden");
        addClass(qrcodeSuccessWrapper, "hidden");
        removeClass(qrcodeExpiredWrapper, "hidden");
        addClass(qrcodeErrorWrapper, "hidden");
        addClass(qrcodeScanText, "hidden");
        break;
      default:
        break;
    }
  };
};
