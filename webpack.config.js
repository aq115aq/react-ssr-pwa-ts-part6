const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将js/css插入到HTML文件中
const nodeExternals = require('webpack-node-externals'); // 不打包node_modules内的文件
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
process.env.NODE_ENV = 'production' // babel-preset-react-app 需要 process.env.NODE_ENV

module.exports = [
// 客户端
{
  entry: {
    browser: './src/index.tsx', // 入口
  },
  output: {
    path: __dirname + '/build', // 输出地址
    filename: '[name].[chunkhash:8].js', // 输出的文件名称
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // import可省略文件后缀
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        oneOf: [ // 打包文件时会从上到下找规则解析，一旦有符合规则就不再向下寻找
          // 打包图片
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // 打包ts
          {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
          },
          // 打包js
          {
            test: /\.(js|jsx|mjs)$/,
            include: path.join(__dirname, 'src'), // 只打包src目录下的
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('babel-preset-react-app')], // babel规则
              compact: true,
            },
          },
          // 打包css
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({  
                fallback: 'style-loader',  
                use: [  
                    'css-loader',  
                ]  
            })
          },
          // 打包scss
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({  
                fallback: 'style-loader',  
                use: [  
                    'css-loader',
                    'sass-loader',
                ]  
            })
          },
        ]
      }
    ],
  },
  plugins:[
    new ExtractTextPlugin("[name].css"),
    // 将生成的js/css插入到HTML中
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public/index.html'), // 初始HTML文件
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new SWPrecacheWebpackPlugin({
      // 默认情况下，插件会根据列表中的资源内容生成一个版本号 revision。
      // 但是使用 Webpack 构建时，通常都会指定静态资源的文件名格式
      // 例如 [name].[hash:8].js ，实际上 [hash] 的作用和 revision 一样，就没必要再为这些文件生成版本号了。
      // 通过配置中的 dontCacheBustUrlsMatching，我们指示插件把这些文件的文件名作为版本号。
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      // 全局缓存, 匹配项全缓存下来
      staticFileGlobs: [
        'build/**/**.jpg',
      ],
      // 过滤前缀
      stripPrefix: 'build/',
      mergeStaticsConfig: true, // 是否将webpack打包出的内容都缓存
      minify: false,
      // For unknown URLs, fallback to the index page
      navigateFallback: '/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // 不缓存的文件
      staticFileGlobsIgnorePatterns: [/server\.js/, /\.map$/, /asset-manifest\.json$/],
    }),
  ],
}, 
// 服务端
{
  entry: {
    server: './server/index.tsx', // 服务端入口
  },
  output: {
    path: __dirname + '/build', // 输出地址
    filename: '[name].js', // 输出名称（server.js）服务端没有浏览器缓存，不用加hash
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 可省略文件后缀
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin("[name].css")
  ],
  module: {
    rules: [
      {
        oneOf: [ // 打包文件时会从上到下找规则解析，一旦有符合规则就不再向下寻找
          // 打包图片
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // 打包ts
          {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
          },
          // 打包js
          {
            test: /\.(js|jsx|mjs)$/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('babel-preset-react-app')], // babel规则
              compact: true,
            },
          },
          // 打包css
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({  
                fallback: 'style-loader',  
                use: [  
                    'css-loader',  
                ]  
            })
          },
          // 打包scss
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({  
                fallback: 'style-loader',  
                use: [  
                    'css-loader',
                    'sass-loader',
                ]  
            })
          },
        ]
      }
    ],
  },
  target: 'node', // nodejs环境
  externals: [nodeExternals()], // 不打包 node_modules
},
// sw-register
{
  entry: {
    'sw-register': './public/sw-register.js', // 入口
  },
  output: {
    path: __dirname + '/build', // 输出地址
    filename: '[name].js', // 输出的文件名称
  },
  resolve: {
    extensions: ['.js'], // import可省略文件后缀.js/.jsx
  },
  plugins:[
    new webpack.DefinePlugin({
      buildTime: Date.now()
    })
  ]
}]
