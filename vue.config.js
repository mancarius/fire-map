// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    https: true,
  },
  configureWebpack: {
    plugins: [
      // Define Bundler Build Feature Flags
      new webpack.DefinePlugin({
        // Drop Options API from bundle
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
      }),
    ],
  },
};
