module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    // host: "132.72.65.211"
    host: "localhost"
    // host: "127.0.0.1"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
