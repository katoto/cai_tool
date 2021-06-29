<template>
  <view
    class="nav"
    :style="{
      height: navH + 'px',
      background: bgColor
    }"
  >
    <view
      class="nav-title"
      :style="{ fontSize: titleFontSize, color: titleColor }"
    >
      {{ title }}
      <block v-if="showLeftBtn && pageLength >= 2">
        <view class="left-item" @click="goBack">
          <hll-icon
            class="head-back"
            size="36rpx"
            name="ic-arrow-left"
          ></hll-icon>
        </view>
      </block>
      <!-- 返回home页按钮，普通页面默认与返回键互斥，tab页隐藏 -->
      <block v-else-if="isHomeBtn">
        <view class="left-item left-home-icon" @click="goHome"
          ><image
            class="back-icon"
            src="https://cimg1.fenqile.com/ibanner2/M00/00/5D/j6gHAF16EfmAaZM_AAAK6GHw2Os312.png"
          ></image
        ></view>
      </block>
    </view>
  </view>
</template>

<script>
import HllIcon from "@/components/base/icon";
export default {
  components: {
    HllIcon
  },
  data() {
    return {
      pageLength: 1,
      // #ifdef MP-WEIXIN
      navH: uni.getSystemInfoSync().statusBarHeight + 46
      // #endif
    };
  },
  props: {
    title: {
      type: String,
      default: "默认标题"
    },
    bgColor: {
      type: String,
      default: "#fff"
    },
    showLeftBtn: {
      type: Boolean,
      default: true
    },
    titleFontSize: {
      type: String,
      default: "12px"
    },
    titleColor: {
      type: String,
      default: "##0C0C0C"
    },
    hasLeftBtnCb: {
      type: Boolean,
      default: false
    },
    isHomeBtn: {
      // 是否展示返回主页按钮，默认无返回键时展示，有返回键时隐藏
      type: Boolean,
      default: true
    }
  },
  created() {
    this.pageLength = getCurrentPages().length;
  },
  mounted() {
    this.$emit("fixedHeadHei", this.navH);
  },
  methods: {
    goBack() {
      if (this.hasLeftBtnCb) {
        this.$emit("leftBtnCallback");
        return;
      }
      uni.navigateBack();
    },

    goHome() {
      if (this.hasLeftBtnCb) {
        this.$emit("leftBtnCallback");
        return;
      }
      this.$pageHref("/pages/home/index/index");
    }
  }
  // height:var(--status-bar-height);
};
</script>

<style src="./index.less" lang="less"></style>
