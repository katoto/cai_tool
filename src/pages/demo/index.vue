<template>
  <view style="text-align: center">
    测试页
    <view>
      <button @click="openPdf">打开pdf</button>
    </view>
  </view>
</template>
<script>
import { openFile } from "@/common/business/tool";

export default {
  components: {},
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
          data: {},
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
        .catch((error) => {
          this.isSendOk = true;
          console.error(error);
        });
    },
  },
};
</script>
