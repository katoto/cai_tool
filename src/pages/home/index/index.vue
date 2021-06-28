<template>
  <view class="content-box">
    <view class="text">Hello uni template</view>
    <view class="text">新建分支，一同改进</view>
  </view>
</template>

<script>
import VDialog from "@/components/base/dialog/index";

export default {
  components: {
    VDialog,
  },
  data() {
    return {
      pageCityName: "",
    };
  },
  computed: {
    isLog() {
      return !!this.$store.state.isLog;
    },
  },
  watch: {},
  mounted() {},
  onShow() {
    // 获取各个资源位数据
  },
  onPullDownRefresh() {},
  methods: {
    imgErrHandle(e) {
      // 头像报错
      if (this.userInfo && this.userInfo.avatar_url) {
        this.userInfo.avatar_url =
          "https://ops-img-static.huolala.cn/imgs/2021/161880543739409453411634.png";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("@/common/less/index.less");
.content-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f3f4f5;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .text {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
