此篇接[Webpack打包ts](./Webpack打包ts.md)

# Webpack打包css

## 安装less的依赖

一共安装四个包

```bash
npm i -D less less-loader css-loader style-loader
```

## 修改webpack配置来加载css

此处也要注意，先用的加载器放在最后

```js
// webpack.config.js
module.exports = {
  // 指定webpack打包时使用的模块
  module: {
    // 指定加载规则
    rules: [
      // 指定ts规则
      {...
      },
      // 指定less/css规则
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
 ...
}
```

## 安装postcss兼容旧版本浏览器

```bash
npm i -D postcss postcss-loader postcss-preset-env
```

再次修改webpack配置，加入postcss配置

```js
// 指定less/css规则
  {
    test: /\.less$/,
    use: [
      "style-loader",
      "css-loader",
      // 引入postcss
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              [
                "postcss-preset-env",
                {
                  browsers: 'last 2 versions'
                }
              ]
            ]
          }
        }
      },
      "less-loader"
    ]
  }
```

