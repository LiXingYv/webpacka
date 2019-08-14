const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//独立提取css的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const {CleanWebpackPlugin} = require("clean-webpack-plugin");//清理输出文件夹插件
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//打包分析插件
const devMode = process.env.NODE_ENV !== 'production';//标识生产/开发环境
const pages = require('./pageDefine');
const merge = require('webpack-merge');

if (process.env.NODE_ENV === 'test') {
    console.log('打包测试环境程序！')
} else {
    console.log(devMode ? "打包开发环境程序！" : "打包生产环境程序！");
}

let hmr = new webpack.HotModuleReplacementPlugin();

const conf = {
    entry: {
        
    },
    output: {
        filename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash:7].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ""
    },
    // externals: {
    //     $: 'jquery'
    // },
    devServer: {
        contentBase: './dist',
        hot: devMode ? true : false
    },
    plugins: [
        new MiniCssExtractPlugin({//声明文件分离插件
            filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash:7].css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: devMode ? {
                    // 不生成内联映射,这样配置就会生成一个source-map文件
                    inline: false,
                    //向css文件添加source-map路径注释,如果没有此项压缩后的css会去除source-map路径注释
                    annotation: true
                } : ''//开发环境下生成cssmap文件
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({//定义全局变量
            HTTP_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
        // new BundleAnalyzerPlugin(),//打包分析插件
        new webpack.ProvidePlugin({//单独全局引入第三方插件
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    optimization: {
        splitChunks: {//分离公共的js库
            cacheGroups: {
                /*commons: {
                    name: "commons",
                    chunks: "all",
                    minChunks: 2,
                    priority: 0
                },*/
                vendor: {//打包jquery和bootstrap到vendor.js
                    name: 'vendor',
                    test:/jquery|bootstrap/,
                    chunks: "all",
                    priority: 9
                },
                /*echarts: {//单独打包echarts到echarts.js文件
                    name: 'echarts',
                    test: /echarts|zrender/,
                    chunks: "all",
                    priority: 10
                }*/
            }
        }
    },
    module: {
        rules: [
            {//使用babel转义js
                test: /\.js$/,
                exclude: /node_modules/,//排除node_modules文件夹下的js文件的转义
                use:[
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {//加载less文件
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'less-loader',
                    "postcss-loader"
                ]
            },
            {//加载css文件
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    "postcss-loader"
                ]
            },
            /*{//加载html文件,这里不适用全局的html加载器因为会和htmlwebpackplugin冲突
                test:/\.(html)$/,
                use:{
                    loader:'html-loader'
                }
            },*/
            {//加载图片
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]',
                            limit: 10000//设置小于10k的文件转换为base64
                        }
                    }
                ]
            },
            {//加载svg
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/[name].[ext]',
                            limit: 10000//设置小于10k的文件转换为base64
                        }
                    }
                ]
            },
            {//加载字体文件
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/[name].[ext]',
                            limit: 10000//设置小于10k的文件转换为base64
                        }
                    }
                ]
            }
        ]
    }
}

if (devMode) {
    conf.plugins.push(hmr);
} else {
    conf.plugins.push(new CleanWebpackPlugin())//非开发环境添加清理插件
}

pageConf = {
    entry: pages.entrys,
    plugins: pages.pages
};

module.exports = merge(conf, pageConf);