// 引入一个包
const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// webpack中的所有的配置信息都应该卸载module.exports中
module.exports = {
  mode: 'development',
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所在的目录
  output: {
    // 指定打包后的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的名字
    filename: 'bundle.js',

    environment: {
      // 告诉webpack不使用箭头函数
      arrowFunction: false,
      // 告诉webpack不使用const
      const: false
    }
  },
  // 指定webpack打包时使用的模块
  module: {
    // 指定加载规则
    rules: [
      // 指定ts规则
      {
        // test指定规则生效的文件
        // 用ts-loader处理以ts结尾的文件
        test: /\.ts$/,
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置预置环境(在哪些浏览器中运行)
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": '88',
                      "ie": '11'
                    },
                    // 指定corejs的版本
                    "corejs": "3",
                    // 使用corejs的方式("usage"表示按需加载)
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 指定要排除的文件(夹)
        exclude: /node_moudles/
      },
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
    ]
  },
  // 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: '这是一个自定义的title'
      template: 'src/index.html'
    }),
  ],
  // 用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}