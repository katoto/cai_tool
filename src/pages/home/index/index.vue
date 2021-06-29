<template>
  <view class="content-box">
    <view class="text">Hello uni template</view>
    <view class="text">新建分支，一起改进</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageCityName: ""
    };
  },
  computed: {
    isLog() {
      return !!this.$store.state.isLog;
    }
  },
  watch: {},
  mounted() {},
  onShow() {},
  onPullDownRefresh() {},
  methods: {
    imgErrHandle() {}
  }
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
