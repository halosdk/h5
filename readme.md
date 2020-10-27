**海螺 jssdk 使用文档:**

```
// 在web应用中引入halo.min.js，通过海螺开放平台获取appId传入sdk配置项，取得sdk实例。
<script src="https://open.hailuo.pro/demo/sdk/halo.min.js"></script>;

// 通过appId初始化海螺 sdk，取得sdk实例
  var haloAuthorization = window.getHaloSdk({
    appId: "APP唯一标识",
  })

 haloAuthorization.authorization({
    appId: "APP唯一标识", // 必填
    responseType: "返回类型，请填写 'code' ", // 必填
    scope:
      "应用授权作用域，base （不弹出授权页面，直接跳转，只能获取用户openId),userinfo （弹出授权页面，可通过openId拿到昵称、性别、所在地。只要用户授权，也能获取其信息)", // 必填
  });

  // 通过sdk实例 唤起海螺 app充值模块进行充值
  haloAuthorization.recharge({
    merchantId: "商户ID", // 必填
    appId: "APP唯一标识", // 必填
    openId: "同一主体用户唯一标识", // 必填
    coinName: "币种名称", // 必填
    amount: "金额", // 必填
    outTradeNo: "商户订单号", // 必填
    remark: "订单备注，可选", // 可选
    accessToken: "通过code换取的网页授权Token", // 通过sdk进行授权,服务器拼接code到业务回调地址后(www.xxx.com?code=xxx) 必填
    notify_url: "充值回调地址", // 必填
    merchant: "商户名称", // 必填
  });
```

**主要有以下简略步骤：**

- **第一步：引导用户进入授权页面同意授权，获取 code**
- **第二步：通过 code 换取网页授权用户信息(accesstoken 、 appId 、openId、refreshToken)**
- **第三步：如果需要，开发者可以刷新网页授权 refreshToken，避免过期**
- **第四步：通过用户信息(accesstoken 、 appId 、openId)获取用户详细信息（支持 UnionID 机制)**

**详细的步骤如下：**

- 1．页面接入 halo sdk。
- 2．获取 sdk 实例，调用 sdk 的 authorization 方法，唤醒 海螺 app 授权页面。
- 3．用户点击同意授权。
- 4．服务器将 code 通过回调传给 notify_url (业务回调地址) 并载入业务回调页面。
- 5．web 获取 code 向服务器请求 access token 、 appid 、openId。
- 6．服务器将 access token 、 appid 、openId 传给 web。
- 7．web 通过 access token 、 appid 、openId 向服务器请求用户信息(scope 为 base 时无此步骤)。
- 8．服务器返回用户信息给 web。

第三方调用接口：
服务器用户提币接口：
调用前必需确认用户完成授权。
服务器调用接口 /api/v1/sdk/merchant/user/withdraw 发起提币请求。
传入 merchantId,appId,openId,coinId,amount,outTradeNo,remark,accessToken,notify_url,merchant,coin 发送请求。
请求成功返回的数据 data 通过解密工具类解密后获取详细数据。

用户授权、充值提现 demo 页面: index.html
扫码登录 demo: /qrconnect/index.html
扫码支付 demo: /qrpay/index.html
