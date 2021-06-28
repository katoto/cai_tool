module.exports = {
  filenameHashing: true, // 文件hash
  chainWebpack: (config) => {
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer("terser").tap((args) => {
      const compress = args[0].terserOptions.compress;
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      compress.drop_console = true;
      return args;
    });
    config.optimization.splitChunks({
      automaticNameDelimiter: "_",
      name: false,
    });
  },
  configureWebpack: {
    performance: {
      hints: "warning",
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith(".js");
      },
    },
  },
};
