const {merge} = require("webpack-merge"); //引入merge工具
const common = require("./webpack.common.js"); //引入刚才写的公共的webpack.common.js文件
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Os = require("os");
//使用merge，可以把common里面写的所有配置项都合并过来，然后再单独写在开发环境下需要的配置即可
module.exports = merge(common, {
    mode: "development", //当前环境变量
    output: {
        filename: "[name].js", //开发环境没有缓存问题，所以不需要添加hash值，添加了会影响编译速度
        publicPath: "/" //公共路径，开发环境写根目录即可
    },
    devtool: "inline-source-map",  //开发开启source-map，方便开发有错误时定位文件位置
    devServer: { //本地服务器
        open: true, //是否自动打开浏览器
        compress: true,
        port: "auto", //端口号，可以自定义也可以写成auto
        client: {
            logging: "none",
            progress: true
        },
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://192.168.0.103:8085',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    // 如果接口本身没有/api需要通过pathRewrite来重写了地址
                    '/api': '',
                },
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [ //loader 顺序是自下而上执行，所以顺序一定不要错
                    "style-loader",
                    "css-loader",
                    //如果需要使用css module模式的话，在这个loader里面添加配置即可，自己百度下
                    "sass-loader"
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
                            cacheDirectory: true, //缓存loader，提高编译速度
                            presets: [
                                "@babel/preset-env",
                                ["@babel/preset-react", {
                                    "runtime": "automatic"
                                }]
                            ],
                            plugins: [require.resolve("react-refresh/babel")]  //HMR 热模块更新
                        }
                    }
                ].filter(Boolean) //过滤掉undefined和null的值
            }
        ]
    },
    plugins: [
        new ReactRefreshPlugin()
    ]
})
