# `Webpack`打包`Typescript`

## 新建`npm`包管理文件

首先在项目根目录中使用`npm init -y`命令，新建`package.json`文件（`-y`表示默认）

## 使用`npm`命令安装包

使用以下命令进行安装，分别是`webpack`核心代码，命令行工具，`typescript`核心代码和`ts加载器`

```bash
npm i -D webpack webpack-cli typescript ts-loader
```

得到如下的`package.json`文件

```json
{
  "name": "03_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^5.2.0",
    "ts-loader": "^8.0.17",
    "typescript": "^4.1.5",
    "webpack": "^5.24.0",
    "webpack-cli": "^4.5.0"
  }
}
```

## 编写`webpack`配置文件

根目录新建`webpack.config.js`，写入如下内容：

```js
// 引入一个包
const path = require('path')

// webpack中的所有的配置信息都应该卸载module.exports中
module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所在的目录
  output: {
    // 指定打包后的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的名字
    filename: 'bundle.js'
  },
  // 指定webpack打包时使用的模块
  module: {
    // 指定加载规则
    rules: [
      {
        // test指定规则生效的文件
        // 用ts-loader处理以ts结尾的文件
        test: /\.ts$/,
        use: 'ts-loader',
        // 指定要排除的文件(夹)
        exclude: /node_moudles/
      }
    ]
  }
}
```

在`package.json`文件中新加入一条`build`命令来进行打包

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
```

## 使用`npm`命令打包

```bash
npm run build
```

根目录下出现`dist/bundle.js`，打包成功

## 自动生成`html`文件

安装`html-webpack-plugin`来自动生成`html`文件，而不用自己手动引入

```bash
npm i -D html-webpack-plugin
```

在`webpack.config.js`文件中新增如下配置

```js
...
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// webpack中的所有的配置信息都应该卸载module.exports中
module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所在的目录
  output: {
      ...
  },
  // 指定webpack打包时使用的模块
  module: {
      ...
  },
  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin(),
  ]
}
```

修改完成后，再次执行`npm run build`，`dist`目录下生成了`index.html`文件

## 自定义生成的`html`文件

在`webpack.config.js`文件的`plugins`配置中修改配置：

```js
module.exports = {
  ...
  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      title: '这是一个自定义的title'
    }),
  ]
}
```

修改完成后，再次执行`npm run build`，查看生成的`index.html`文件，`title`成功修改为自定义

## `webpack`定义网页模版

在`webpack.config.js`文件的`plugins`配置中修改配置，新增`template`

```js
module.exports = {
  ...
  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      // title: '这是一个自定义的title'
      template: 'src/index.html'
    }),
  ]
}
```

同时，在`src`目录下新建`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>这是一个网页模版</title>
  </head>
  <body>
    <div id="box1">我是box1</div>
  </body>
</html>
```

再次构建，查看`dist`目录下的`index.html`，成功生成模版

## `Webpack`开发服务器

使用如下命令安装

```bash
npm i -D webpack-dev-server
```

在`package.json`文件下增加命令

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --open 'google chrome'"
  },
```

此处是`Mac`电脑的配置命令，Windows写成`webpack serve --open chrome.exe`即可

使用`npm start`，启动了webpack内置服务器，显示出了`index.html`

## 清空`dist`目录的插件

清空`dist`目录的插件，确保当前是最新的文件

使用如下命令安装

```bash
npm i -D clean-webpack-plugin
```

修改`webpack.config.js`文件

```js
  ...
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  ...
  // 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: '这是一个自定义的title'
      template: './src/index.html'
    }),
  ]
}
```

## webpack配置ts模块化引入

默认情况下不支持ts的模块化引入，需要在`webpack.config.js`文件中修改如下配置

```js
// webpack中的所有的配置信息都应该卸载module.exports中
module.exports = {
  ...
  // 用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}
```

---

# `babel`转译`ts`支持老版本浏览器

## 安装`babel`的依赖包

使用如下命令进行安装

```bash
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

## 修改`webpack.config.js`

**要注意的是，`use`中的加载器，执行顺序是从后往前的，最先执行的加载器应该写在最后**

```js
module.exports = {
  ...
  // 指定webpack打包时使用的模块
  module: {
    // 指定加载规则
    rules: [
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
      }
    ]
  },
...
}
```

此时执行`npm run build`在`IE11`中运行发现还是报错了，原因是最外层使用了箭头函数，需要在`webpack.config.js`中禁止使用箭头函数

```js
  ...
module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所在的目录
  output: {
    // 指定打包后的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的名字
    filename: 'bundle.js',
    // 告诉webpack不使用箭头函数
    environment: {
      arrowFunction: false
    }
  },
  ...
}
```

