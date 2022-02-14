<script>
export default {
  onLaunch: function() {},
  methods: {},
  async onShow() {}
};
</script>

<style lang="less">
@import "@/common/less/index.less";

/*每个页面公共css */
/* #ifdef H5 */
html {
  background-color: #f2f2f2;
}
body {
  max-width: @h5pagewidth;
  margin: auto;
  background-color: #fff;
}
uni-page-head {
  height: 88px;
  line-height: 88px;
  max-width: @h5pagewidth;
  width: 100%;
}
uni-page-head .uni-page-head {
  height: 88px;
  line-height: 88px;
  max-width: @h5pagewidth;
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  .uni-page-head__title {
    font-size: 32px !important;
    line-height: 68px;
  }
  .uni-page-head-btn {
    margin: 0 8px;
  }
  .uni-btn-icon {
    font-size: 40px !important;
    margin-top: 34px;
  }
}

uni-tabbar .uni-tabbar {
  height: 80px;
  max-width: @h5pagewidth;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  .uni-tabbar__icon {
    height: 40px;
    width: 40px;
  }
}

uni-toast .uni-simple-toast__text {
  font-size: 20px !important;
}

// 去掉滚动条宽度 避免左右tab造成页面切换
::-webkit-scrollbar {
  width: 1px;
}

::-webkit-scrollbar-track {
  border-radius: 0;
}
// 滚动条
::-webkit-scrollbar-thumb {
  border-radius: 0;
}

@media only screen and (max-width: 700px) {
  uni-page-head {
    height: 88px;
    line-height: 88px;
    max-width: @h5pagewidth;
  }
  uni-page-head .uni-page-head {
    height: 44px;
    line-height: 44px;
    .uni-page-head__title {
      font-size: 16px !important;
      line-height: 34px;
    }
    .uni-page-head-btn {
      margin: 0 4px;
    }
    .uni-btn-icon {
      font-size: 20px !important;
      margin-top: 17px;
    }
  }

  uni-tabbar .uni-tabbar {
    height: 40px;
    max-width: @h5pagewidth;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    .uni-tabbar__icon {
      height: 20px;
      width: 20px;
    }
  }
}
@media only screen and (max-width: 500px) {
  uni-page-head {
    height: 44px;
    line-height: 44px;
    max-width: @h5pagewidth;
  }
  uni-toast .uni-simple-toast__text {
    font-size: 18px !important;
  }
}

/* #endif */
</style>
