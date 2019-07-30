/**
 * Created by Lee on 2019/7/17.
 */
import B from "../base/base.js"
import "../css/body2.css"
import $ from "jquery"

// console.log('body2:',B);
var imgUrl = require('../img/test.jpg');
// var imgTempl = '<img src="'+imgUrl+'"/>';
var imgTempl = document.createElement("img");
imgTempl.src=imgUrl;
// document.body.appendChild(imgTempl)
