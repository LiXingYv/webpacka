const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//独立提取css的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");//清理输出文件夹插件
const webpack=require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//打包分析插件
const devMode = process.env.NODE_ENV !== 'production';//标识生产/开发环境

console.log(devMode?"":"打包生产环境程序！");

module.exports = {
    entry:{
        "body1" : "./js/body1.js",
        "body2" : "./js/body2.js"
    },
    output:{
        filename:'js/[name].js',
        path:path.resolve(__dirname,'dist'),
        publicPath:""
    },
    mode: devMode ? 'development' : 'production',
    // externals: {
    //     $: 'jquery'
    // },
    devServer:{
        // contentBase:'./dist',
        hot:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'body1.html',
            template:"page/body1.html",
            chunks:['body1','vendor'],
            minify:{
                removeComments:true,//清除注释
                collapseWhitespace:true,//清除html中的空格、换行符
                minifyCss:true,//压缩html内的样式
                minifyJS:true,//压缩html内的js
                // removeEmptyElements:true//清理内容为空的元素
            }
        }),
        new HtmlWebpackPlugin({
            filename:'body2.html',
            template:"page/body2.html",
            chunks:['body2','vendor'],
            minify:{
                removeComments:true,//清除注释
                collapseWhitespace:true,//清除html中的空格、换行符
                minifyCss:true,//压缩html内的样式
                minifyJS:true,//压缩html内的js
                // removeEmptyElements:true//清理内容为空的元素
            }
        }),
        new CleanWebpackPlugin(),//每次编译的清理插件
        new MiniCssExtractPlugin({//声明文件分离插件
            filename:  devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: devMode ? {
                    // 不生成内联映射,这样配置就会生成一个source-map文件
                    inline: false,
                    //向css文件添加source-map路径注释,如果没有此项压缩后的css会去除source-map路径注释
                    annotation: true
                } : ''//生产环境下生成cssmap文件
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),//热重载
        // new BundleAnalyzerPlugin()//打包分析插件
        // new webpack.ProvidePlugin({//单独全局引入第三方插件
        //     $:"jquery"
        // }),
    ],
    optimization: {
        splitChunks: {//分离公共的js库
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "all",
                    minChunks: 2,
                    priority:0
                },
                vendor:{
                    name:'vendor',
                    test:/[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority:10
                }
            }
        }
    },
    module:{
        rules:[
            {//加载css文件
                test: /\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../',
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll:true
                        }
                    },
                    'css-loader'
                ]
            },
            /*{//加载html文件,这里不适用全局的html加载器因为会和htmlwebpackplugin冲突
                test:/\.(html)$/,
                use:{
                    loader:'html-loader'
                }
            },*/
            {//加载图片
                test:/\.(png|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'[path][name].[ext]',
                            limit:10000//设置小于10k的文件转换为base64
                        }
                    }
                ]
            },
            {//加载svg
                test:/\.(svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'assets/[name].[ext]',
                            limit:10000//设置小于10k的文件转换为base64
                        }
                    }
                ]
            },
            {//加载字体文件
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'assets/[name].[ext]',
                            limit:10000//设置小于10k的文件转换为base64
                        }
                    }
                ]
            }
        ]
    }
}
