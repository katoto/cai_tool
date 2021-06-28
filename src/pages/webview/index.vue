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
          color: "#FF3333",
        },
      },
    };
  },
  onLoad(params) {
    if (params && params.url) {
      this.currUrl = decodeURIComponent(params.url);
    }
  },
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  methods: {},
};
</script>
