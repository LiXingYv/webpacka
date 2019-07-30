const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//独立css的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");//清理输出文件夹插件
const webpack=require("webpack")

module.exports = {
    entry:{
        "js/body1" : "./js/body1.js",
        "js/body2" : "./js/body2.js",
        vendor:['jquery']

    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist'),
        publicPath:""
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'body1.html',
            template:"page/body1.html",
            chunks:['js/body1']
        }),
        new HtmlWebpackPlugin({
            filename:'body2.html',
            template:"page/body2.html",
            chunks:['js/body2']
        }),
        new CleanWebpackPlugin(),//每次编译的清理插件
        new ExtractTextPlugin({//声明文件分离插件
            filename:  (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        }),
        new webpack.ProvidePlugin({//单独全局引入第三方插件
            $:"jquery"
        }),
        optimization:{
    splitChunks: {
        cacheGroups: {
            commons: {
                name: "commons",
                    chunks: "initial",
                    minChunks: 2
            }
        }
    }
}


    ],
    module:{
        rules:[
            {//加载css文件
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath:'../'//css内图片引用的路径添加的前缀
                })
            },
            /*{//加载html文件,这里不适用全局的html加载器因为会和htmlwebpackplugin冲突
                test:/\.(html)$/,
                use:{
                    loader:'html-loader'
                }
            },*/
            {//加载图片
                test:/\.(png|svg|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[path][name].[ext]'
                        }
                    }
                ]
            },
            {//加载字体文件
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[path][name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}
