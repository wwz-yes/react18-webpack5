const {merge} = require("webpack-merge"); //引入merge工具
const common = require("./webpack.common.js"); //引入刚才写的公共的webpack.common.js文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const Os = require("os");

//使用merge，可以把common里面写的所有配置项都合并过来，然后再单独写在生产环境下需要的配置即可
module.exports = merge(common, {
    mode: "production", //当前环境变量
    output: {
        filename: "static/js/[name].[contenthash:8].js", //将js文件放到对应的目录下，并使用hash值命名，当js内容修改后，文件名也会对应修改
        publicPath: "./" //公共路径，生产环境写相对路径，这样前端页面放到其他的目录下的时候不会出现白屏问题
    },
    devtool: false,  //生产环境下用的source map 模式
    // devtool:"source-map",  //生产环境下用的source map 模式
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [ //loader 顺序是自下而上执行，所以顺序一定不要错
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../../" //这个路径是控制打包的css文件里面写的路径，因为把css文件放到了static/css文件下了，所以需要重置下css里面的公共路径配置
                        }
                    },
                    "css-loader", //如果需要使用css module模式的话，在这个loader里面添加配置即可，自己百度下
                    "sass-loader",
                    "postcss-loader" //这个loader是用来处理css前缀的，如果不需要的话，可以去掉
                ].filter(Boolean) //过滤掉undefined和null的值
            },
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules/", //处理js文件，剔除node_modules文件里面的文件
                use: [
                    {
                        loader: "thread-loader",
                        options: {workers: Os.cpus().length}
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                ["@babel/preset-react", {
                                    "runtime": "automatic"
                                }]
                            ]
                            //生产环境下不需要HRM热模块更新，所以去掉
                        }
                    }
                ].filter(Boolean) //过滤掉undefined和null的值，因为这两个值不是loader的返回值，而是undefined和null，所以会报错
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "static/css/[name]_[contenthash:8].css" //配置css文件输出路径
        }),
        // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS 的参数
            // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
            uglifyJS: {
                output: {
                    beautify: false, // 最紧凑的输出
                    comments: false, // 删除所有的注释
                },
                compress: {
                    // 删除所有的 `console` 语句，可以兼容 IE 浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }
        })
    ]
})
