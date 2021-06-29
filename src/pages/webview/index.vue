<template>
  <view>
    <web-view :webview-styles="webviewStyles" :src="currUrl"></web-view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cancelList: [],
      currUrl: "",
      webviewStyles: {
        progress: {
          color: "#FF3333"
        }
      }
    };
  },
  onLoad(parameters) {
    if (parameters && parameters.url) {
      this.currUrl = decodeURIComponent(parameters.url);
    }
  },
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  methods: {}
};
</script>
