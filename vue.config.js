module.exports = {
  // 设置打包时的公共路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 配置pc端适配
  css: {
    loaderOptions: {
      postcss: {
          postcssOptions: {
            plugins: [
              require('postcss-pxtorem')({
                rootValue : 16, // 换算的基数
                minPixelValue: 2,
                selectorBlackList  : [],
                propList   : ['*'],
              }),
            ]
          }
        }
    }
}
};