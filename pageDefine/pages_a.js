
const HtmlWebpackPlugin = require('html-webpack-plugin');

entrys = {
    "page1" : "./js/page1.js",
}

pages = [
    new HtmlWebpackPlugin({
        filename:'page1.html',
        template:"page/page1.html",
        chunks:['page1','vendor'],
        title:'page1',
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