<template>
  <view>
    测试页
    <view
      >字体图标
      <!-- 货拉拉图标 -->
      <hll-icon name="ic-checkbox-off"></hll-icon>
      <hll-icon name="ic-star"></hll-icon>
      <hll-icon name="ic-arrow-up"></hll-icon>
      <hll-icon name="ic-message"></hll-icon>

      <view @click="openPdf">打开pdd</view>

      <!-- 车吉吉图标 -->
      <hll-icon name="icon-coupon" size="114px" :isCjjIcon="true"></hll-icon>
    </view>
  </view>
</template>
<script>
import HllIcon from "@/components/base/icon";
import { openFile } from "@/common/business/tool";

export default {
  components: {
    HllIcon,
  },
  created() {},
  mounted() {},
  methods: {
    openFile,
    openPdf() {
      this.openFile("https://m.leka.club/res/word/G-10.pdf", "G-10.pdf");
    },
    send() {
      this.$network(
        "/api/feedback.commit/",
        {
          data: { ...data },
        },
        {
          dontHandlerData: true, // 不集中处理
        }
      )
        .then((res) => {
          this.isSendOk = true;
          if (res.errInfo) {
            return;
          }
        })
        .catch((err) => {
          this.isSendOk = true;
          console.error(err);
        });
    },
  },
};
</script>
