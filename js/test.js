/**
 * Created by Lee on 2019/8/27.
 */
var str1 = "https://www.baidu.com"
str1 = str1.replace(/https/g,"http");
console.log(str1);
console.log("李祥雨".replace(/.(?=.)/g, '*'))
console.log("李祥雨".replace(/(?<=.)./g, '*'))