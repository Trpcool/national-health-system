/**
 * 1.npm i postcss-pxtorem -D
 * 2.使用esm配置postcss.config.mjs文件，注意一定是该命令文件
 * 这样npm run dev 能读取该配置
 * 3.写一个js脚本监听resize动态计算根元素的fontsize
 * 4.导入main.js
 */

export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16, // 根元素字体大小（1rem = 16px）
      propList: ["*"], // 要转换的属性，* 表示所有属性
      unitPrecision: 5, // rem 单位的小数位数
      replace: true, // 是否替换原来的 px 单位
      mediaQuery: false, // 是否在媒体查询中转换 px
      minPixelValue: 1, // 小于或等于 1px 不转换
    },
  },
};
