/**
 * Created by Lee on 2019/7/17.
 */
import "./head.js"
import "../css/page2.css"

// console.log('body2:',B);
var imgUrl = require('../assets/test.jpg');
// var imgTempl = '<img src="'+imgUrl+'"/>';
var imgTempl = document.createElement("img");
imgTempl.src=imgUrl;
// document.body.appendChild(imgTempl)
