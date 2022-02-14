<template>
  <!-- 车吉吉功能区 -->
  <view class="func-area" :class="{ 'usercenter-type': small }">
    <view class="area-title" v-if="title">{{ title }}</view>
    <view class="area-cont" :class="{ 'no-title': !title }">
      <view
        class="cont-item"
        v-for="(item, index) in configData"
        :key="index"
        @click="bindItemClick(item)"
      >
        <view class="item-img-box">
          <image class="item-img" :src="item.img"></image>
          <view class="flag" v-if="item.flag">{{ item.flag }}</view>
        </view>
        <text class="item-desc">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    configData: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    bindItemClick(item) {
      // option page redirect tab
      if (item && item.url) {
        let _option = "page";
        let _currentUrl = item.url;
        if (item.url.includes(":")) {
          let _parametersArray = _currentUrl.split(":");
          _option = _parametersArray[0];
          _currentUrl = _parametersArray[1];
        }
        this.$pageHref(_currentUrl, "", {
          type: _option
        });
      }
      this.$emit("funcHandle", item);
    }
  }
};
</script>
<style src="./index.less" lang="less" scoped></style>
