
const HtmlWebpackPlugin = require('html-webpack-plugin');

entrys = {
    "page2" : "./js/page2.js",
}

pages = [
    new HtmlWebpackPlugin({
        filename:'page2.html',
        template:"page/page2.html",
        chunks:['body2','vendor'],
        title:"page2",
        minify:{
            removeComments:true,//清除注释
            collapseWhitespace:true,//清除html中的空格、换行符
            minifyCss:true,//压缩html内的样式
            minifyJS:true,//压缩html内的js
            // removeEmptyElements:true//清理内容为空的元素
        }
    })
]

module.exports = {entrys,pages}