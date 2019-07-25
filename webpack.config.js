const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//独立css的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");//清理输出文件夹插件

module.exports = {
    entry:{
        "js/body1" : "./js/body1.js",
        "js/body2" : "./js/body2.js"
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
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
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test:/\.(png|svg|jpg|gif|jpeg)$/,
                use:[
                    'file-loader'
                ]
            }
        ]
    }
}
