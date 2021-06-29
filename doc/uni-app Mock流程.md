## uni mock 流程

车吉吉这边使用 yapi 进行接口的管理

yapi 链接：
http://devtool.huolala.work/group/4213

yapi 教程参考： https://hellosean1025.github.io/yapi/

### 1、微信小程序 Mock 方式

开发者工具提供了 API Mock 的能力，可以模拟部分 API 的调用结果。

![](https://ops-img-static.huolala.cn/imgs/2021/16197665212509999599217.png)

![](https://ops-img-static.huolala.cn/imgs/2021/161976655528982486888053.png)

eg:

```
{
  "data": {
    "data": {
      "phone": "123"
    },
    "ret": "0",
    "msg": "ok"
  },
  "statusCode": 200
}
```

缺点： 需要自己对着提供文档进行 mock 模拟

详见操作见微信官方文档
https://developers.weixin.qq.com/miniprogram/dev/devtools/api-mock.html

### 2、h5 Mock 方式

npm run serve-mock 启动本地服务和 mock，相关 proxy 如下：

```
"proxy": {
  "/api/": {
    "target": "https://b.leka.club",
    "changeOrigin": true,
    "secure": true,
    "pathRewrite": {
      "^/api/": "/"
    }
  },
  "/mock/": {
    "target": "http://devtool.huolala.work/",
    "changeOrigin": true,
    "secure": true
  }
}
```

比如你要 mock 如下的接口数据，你只需启动

- terminal 上运行

```
npm run serve-mock
```

- 在代码里统一写

```
this.$network("/chejiji/test", {
  data: { key: CONFIG_KEY },
})
```

test:
http://devtool.huolala.work/mock/1847/chejiji/test

如果 yapi 需要 host，请配合 host 进行使用

### 2.1 stg 环境的 mock Todo

### 3、利用抓包工具进行 mock

todo
