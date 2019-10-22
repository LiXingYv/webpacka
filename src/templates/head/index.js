/*
 * @Description: 项目公共头部
 * @Author: YiXu
 * @Date: 2019-10-10 16:10:36
 */


/**
 * 1、引入本组件的样式
 */
import "./index.css"

/**
 * 2、引入本项目公共资源，包括公共配置，公共函数，通用工具函数
 */
import { baseUrl } from 'src@/base/config/index.js'//引入本项目公共配置，此处只引入了url地址
var common = require('src@/base/common/index.js') //引入本项目公共函数
var utils = require('src@/base/utils/index.js') //引入通用工具函数库

/**
 * 3、引入第三方插件
 */
// require('layui-layer')

/**
 * 4、声明本组件内部全局变量
 */
var logoutUrl = baseUrl + "api/user/logout"; //请求退出
var userInfo = sessionStorage.getItem('nick');// 获取到用户的信息
var urlstr = window.location.href;// 当前链接地址

/**
 * 5、页面初始化时本组件的函数执行部分
 */

// nav选择状态判断
if(urlstr.indexOf('zonglan')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='zonglan']").addClass('on')
}else if(urlstr.indexOf('maintain')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='maintain']").addClass('on')
}else if(urlstr.indexOf('setting')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='setting']").addClass('on')
}else if(urlstr.indexOf('shebeiweihu')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='shebeiweihu']").addClass('on')
}else if(urlstr.indexOf('demo')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='demo']").addClass('on')
}

// 将用户昵称显示到页面上
$('#usernick').text(userInfo);

/**
 * 6、本组件的页面事件注册部分
 */

// 用户退出
$('.userquit').on('click',function(){
    $('.quitdefinebtn').on('click',function(){
        utils.Request.ajaxHttpsRequest(logoutUrl, {}, function (res) {
            console.log(res)
            if (res.code == 200) {
                location.href = "./index.html"
                sessionStorage.clear()
                layer.msg('登出成功')
            }
        })
        
    })
})

/**
 * 7、组件的公共函数部分
 */























