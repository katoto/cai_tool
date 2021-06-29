## 快速上手

uni-app 微信小程序项目模板整合了路由配置、接口请求 request、状态管理 store、mock 模拟 和 proxy 代理通用业务功能,也设置了规范 GIT 代码提交信息&自动化版本管理。该模版的目标是使开发专注于业务，更快速支撑业务。

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
  走 stg 环境则： npm run dev:mp-weixin-stg
  走 pre 环境则： npm run dev:mp-weixin-pre
  走 prod & 线上 环境则： npm run dev:mp-weixin
- 检查 fiddler `xxx.xxx.xx.xxx www.xxx.com` 代理（容易遗漏）
- 利用[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，打开 dist/dev 工程即可。

**打包发布**

- terminal 跑命令 `npm run build:mp-weixin`
  走 stg 环境则： npm run build-weixin-stg
  走 pre 环境则： npm run build:mp-weixin-pre
  走 prod & 线上 环境则： npm run build:mp-weixin
- 利用微信开发者工具，打开 dist/build 工程, 然后上传审核 =》 发布

---

参考原车吉吉 https://huolala.feishu.cn/docs/doccnUUd5wrl9hE52xPzqKR5p2b

### 二、git 提交规范

良好的 commit message 能大大提高代码维护的效率，so 尽量按下面来，写清 commit 了什么内容。如果不记得了也可以使用`npm run commit`进行命令行选择提交。

如果你全局安装了

```
sudo npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

也可直接 git cz 进行提交。

- feat - 新增需求、需求迭代、新功能等相关的提交
- fix - BUG 修复提交
- docs - 文档相关的提交
- refactor - 技术优化类的代码重构，不影响具体需求和逻辑，也不涉及 BUG 修复的修改，如：测速优化、性能优化、模块拆分等
- chore - 代码维护相关的小改动，如：更新依赖库、构建工具及其配置的改动、代码格式调整等
  较不常用的：
- workflow - 开发工作流的改动，比如修改 package.json 中的 scripts，比如增加或修改一些发布脚本
- test - 测试相关的修改，比如增加测试用例。
- build - 打包部分小调整

### 三、集成 gitHooks 对 commit 提交进行检查

这里利用`yorkie` 和`lint-staged` 来使 git hooks 操作变的更加容易。
相关配置：

```
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node scripts/check-commit.js"
  },
  "lint-staged": {
    "*.{js,ts,vue}": "eslint --fix",
    "*.{md,json,css,less,scss}": "prettier --write"
  }
```

### 四、集成自动版本号维护

这里利用`standard-version` 来实现。每次新增 npm 包版本时，会自动维护版本号和`CHANGELOG.md`修改日志。

相关配置：

```
    // 主版本
    "release:major": "standard-version --release-as major",
    // 次版本
    "release:minor": "standard-version --release-as minor",
    // 修订版本
    "release:patch": "standard-version --release-as patch"
```

### 五、其他资料

uni-app 小程序基础及业务组件库
http://uniui.w3c.huolala.work

[uniapp 官网](https://uniapp.dcloud.io/)

注意加上`manifest.json` 的 appid & name

```
  "name": "小程序名称",
  "appid": "wxcbxxxxxxxxd2",
```
