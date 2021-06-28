## 快速上手
uni-app 小程序项目模板整合了路由配置、接口请求、状态管理、mock和代理等通用功能，目标是使开发专注于业务。

### 一、上手步骤 & 开发

- 1、npm install -g @vue/cli 安装 cli
- 2、npm install 安装依赖 yarn install
- 3、npm run dev:%name% 开发
- 4、npm run build:%name% 发布
- 5、检查 fiddler\wistle 是否已有对应域名的代理

%name% 表示要打包的平台，这里仅关注 **h5** 和 **mp-weixin** 即可。  
所有%name% 的值：app-plus、h5、mp-alipay、mp-baidu、mp-weixin、mp-toutiao、mp-qq

走完 5 步骤走完，你已健步如飞。另，由于 h5 与微信端存在差异，所以本地开发有如下不同：

---

### 微信小程序开发&发布步骤

**本地开发**

- terminal 跑命令 `npm run dev:mp-weixin`
- 检查 fiddler `xxx.xxx.xx.xxx b.leka.club` 代理（容易遗漏）
- 利用[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，打开 dist/dev 工程即可。

**打包发布**

- terminal 跑命令 `npm run build:mp-weixin`
- 利用微信开发者工具，打开 dist/build 工程, 然后上传审核 =》 发布

---
### 参考原车吉吉 https://huolala.feishu.cn/docs/doccnUUd5wrl9hE52xPzqKR5p2b

#### 神策数据埋点
测试环境
https://uba-dev.huolala.cn/sa?project=production

正式环境
https://uba.huolala.cn/sa?project=production

uni-app 小程序基础及业务组件库
http://uniui.w3c.huolala.work

前端工程化相关
https://styleguidist-v-stg.huolala.cn/docs
