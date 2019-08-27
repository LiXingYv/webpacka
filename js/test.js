/**
 * Created by Lee on 2019/8/27.
 */
var str1 = "https://www.baidu.com"
str1 = str1.replace(/https/g,"http");
console.log(str1);
console.log("李祥雨".replace(/.(?=.)/g, '*'))//保留姓名最后一个字,firefox和ie不支持此语法
console.log("李祥雨".replace(/(?<=.)./g, '*'))//保留姓名第一个字,firefox和ie不支持此语法

function curtName(str) {
    return str.slice(0,1) + new Array(str.length).join('*') ;
}
console.log(curtName("纳兰雪"))