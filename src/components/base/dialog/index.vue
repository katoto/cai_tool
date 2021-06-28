<template>
  <view
    class="mask"
    v-if="isShow"
    catchtouchmove="preventTouchMove"
    @click="hide"
  >
    <view class="hll-dialog" @click.stop="onContentClick">
      <view class="title" v-if="title" :style="titleStyle">{{ title }}</view>
      <view class="content" :style="msgStyle">
        <slot v-if="isSlotContent"></slot><text class="cont-txt" v-else>{{ msg }}</text>
      </view>
      <view class="bottom-btn" v-if="bottomBtn">
        <view
          @click="operDialog('cancle')"
          class="btn cancel"
          v-if="type === 'confirm'"
          >{{ cancleBtnText }}</view
        >
        <view class="btn confirm" @click="operDialog('confirm')">{{
          confirmBtnText
        }}</view>
      </view>
      <view class="center-btn" v-else>
        <view class="btn-box" @click="operDialog('confirm')">
          <text class="btn-txt">确定</text>
        </view>
      </view>
      <image
        class="close"
        v-if="showClose"
        @click="operDialog('cancle')"
        src="https://cimg1.fenqile.com/ibanner2/M00/00/96/kagHAF1_YRSACIdjAAACmUyL1Cc666.png"
      ></image>
    </view>
  </view>
</template>

<script>
const defaultData = {
  isShow: false,
  type: "alert", // 'confirm','alert'
  title: "标题",
  msg: "内容",
  showClose: true,
  bottomBtn: false, // 按钮贴弹窗底部
  isSlotContent: false, // 自定义slot
  confirmBtnText: "确认",
  cancleBtnText: "取消",
  confirmHandler: null,
  cancleHandler: null,
  titleStyle: {},
  msgStyle: {},
  willclose: true, // 点击[取消],[确定],[关闭]后直接关闭弹窗
};

export default {
  data() {
    return JSON.parse(JSON.stringify(defaultData));
  },
  methods: {
    showConfirm(options = {}) {
      options.type = "confirm";
      this.show(options);
    },
    showAlert(options = {}) {
      options.type = "alert";
      this.show(options);
    },
    show(options = {}) {
      Object.keys(defaultData).forEach((key) => {
        this[key] =
          options[key] !== undefined ? options[key] : defaultData[key];
      });
      this.isShow = true;
    },
    hide(options = {}) {
      this.isShow = false;
    },
    onContentClick() {},
    operDialog(type) {
      var handleName = type + "Handler";
      if (typeof this[handleName] === "function") {
        this[handleName]();
        this.willclose && this.hide();
      } else {
        this.hide();
      }
    },
  },
};
</script>

<style src="./index.less" lang="less"></style>
