<template>
  <view style="text-align: center">
    测试商品首页
    <view>
      <view class="bar">
        <view
          style="flex: 1; text-align: center; line-height: 50px; color: #fff"
        >
          <text>（不含运费）共计：{{ 100 || totalPrice }}</text>
        </view>
        <view
          @click="copyTBL"
          style="
            width: 100px;
            text-align: center;
            line-height: 50px;
            color: #fff;
            background: black;
          "
        >
          <text>复制信息</text>
        </view>
      </view>
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
    handleCopyData() {
      const { array, totalPrice, recInfo } = this.data;
      const { recName, recMobile, recAddress } = recInfo;
      let copydata = "へ订单信息へ\n";
      array.forEach((e, i) => {
        if (e.count > 0) {
          copydata +=
            e.name +
            "：" +
            e.count +
            "x" +
            e.price +
            "  " +
            e.count * e.price +
            "元\n";
        }
      });
      copydata += "共计：" + totalPrice + "元（不含运费）";

      if (recName || recMobile || recAddress) {
        copydata += "\nへ快递信息ペ\n";
        copydata += "收货人：" + (recName || "") + "\n";
        copydata += "电话：" + (recMobile || "") + "\n";
        copydata += "收货地址：" + (recAddress || "") + "\n";
      }

      return copydata;
    },
    copyTBL() {
      wx.setClipboardData({
        // data: self.handleCopyData(),
        data: "test handleCopyData",
        success: function (res) {
          // self.setData({copyTip:true}),
          wx.showModal({
            title: "提示",
            content: "订单信息复制成功，关闭小程序粘贴发送吧！",
            success: function (res) {
              if (res.confirm) {
                console.log("确定");
              } else if (res.cancel) {
                console.log("取消");
              }
            },
          });
        },
      });
    },
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
