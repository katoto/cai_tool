<template>
  <view class="content-box">
    <view class="text">Hello uni template</view>
    <view class="text">pull体验，改进</view>
    <button @click.stop="jump2Page">页面跳转</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      page: "",
    };
  },
  computed: {
    isLog() {
      return !!this.$store.state.isLog;
    },
  },
  watch: {},
  mounted() {
    this.$toast("Hello uni temp~");
  },
  onShow() {},
  onPullDownRefresh() {},
  methods: {
    jump2Page() {
      this.$pageHref("/pages/demo/index");
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
    margin-bottom: 30px;
  }
}
</style>
