const path = require("path");  //node环境当前路径
const HtmlWebpackPlugin = require("html-webpack-plugin");  //模板文件插件，能够自动将打包的css和js加入到模板文件中
const {ProgressPlugin} = require("webpack");  //引入webpack提供的插件，用于引入全局变量，比如jquery

module.exports = {
    entry: {
        app: path.resolve(__dirname, "../src/index.js") //找到咱们刚才在src下面的入口文件
    },
    output: {
        filename: '[name].[contenthash].js',			// 输出文件名
        path: path.resolve(__dirname, '../dist'),			// 输出文件的目标文件夹
        clean: true,									// 每次打包后是否清除dist
        hashDigestLength: 5,							// hash值的长度
        assetModuleFilename: '[name][contenthash][ext]' 	// 静态资源的文件名
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src")
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"]// 省略后缀名
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|svg)$/, //处理图片文件打包
                type: "asset", //webpack5新增的处理静态资源的loader，替换之前的url-loder、file-loader,具体的可以官方文档
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024 //最大100kb的文件会被转成base64，大于100kb的文件会转成图片文件
                    }
                },
                generator: {
                    filename: "static/images/[name]_[contenthash:8][ext]" //最终图片文件输出的路径
                }
            }
        ]
    },
    plugins: [
        new ProgressPlugin({
            activeModules: true,         // 默认false，显示活动模块计数和一个活动模块正在进行消息。
            entries: true,  			   // 默认true，显示正在进行的条目计数消息。
            modules: false,              // 默认true，显示正在进行的模块计数消息。
            modulesCount: 5000,          // 默认5000，开始时的最小模块数。PS:modules启用属性时生效。
            profile: false,         	   // 默认false，告诉ProgressPlugin为进度步骤收集配置文件数据。
            dependencies: false,         // 默认true，显示正在进行的依赖项计数消息。
            dependenciesCount: 10000,    // 默认10000，开始时的最小依赖项计数。PS:dependencies启用属性时生效。
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"), //找到咱们刚才创建的模板文件
            minify: { //压缩html
                collapseWhitespace: true, //移除空格
                removeComments: true // 移除注释
            }
        }),
    ]

}
