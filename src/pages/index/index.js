/*
* @Description: 主页
* @Author: WangXin
* @Date: 2019-08-16 17:19:43
*/


/**
 * 1、引入本页面的样式文件
 */
import './index.less'


/**
 * 2、引入本项目公共资源，包括公共配置，公共函数，通用工具函数
 */
import { baseUrl } from 'src@/base/config/index.js'//引入本项目公共配置，此处只引入了url地址
var common = require('src@/base/common/index.js') //引入本项目公共函数
var utils = require('src@/base/utils/index.js') //引入通用工具函数库

/**
 * 3、引入本页面引入的项目公共组件js
 */

/**
 * 4、引入第三方插件
 */

/**
 * 5、声明本页面全局变量
 */

/**
 * 6、页面初始化函数执行部分
 */
var loginUrl = baseUrl + 'api/user/index'

/**
 * 7、页面事件注册部分
 */

// 登录按钮的点击事件
$('.index-btn').click(function() {
	var sendData = {
		name: $.trim($('#account').val()),
		password: $.trim($('#password').val())
	}
	console.log(sendData)

	if (sendData.name == '') {
		layer.msg('请输入用户名')
		return
	} else if (sendData.password == '') {
		layer.msg('请输入密码')
		return
	}
	// 发送ajax请求
	utils.Request.ajaxHttpsRequest(loginUrl, sendData, function(res) {
		if (res.code == 200) {
			sessionStorage.setItem('token', res.token)
			sessionStorage.setItem('nick', res.data)
			location.href = './zonglan.html'
		} else {
			if (res.data) {
				layer.msg(res.data)
			} else {
				layer.msg(res.msg)
			}
		}
	})
})

// 回车登录的方法
$('#password').keyup(function(event) {
	/* Act on the event */
	if (event.keyCode==13) {
		$('.index-btn').click()
	}
})

/**
 * 8、页面公共函数部分
 */