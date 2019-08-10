/*
 * @Author: 王新
 * @Date: 2019-07-22 08:51:45
 * @LastEditors: 王新
 * @LastEditTime: 2019-08-06 09:32:08
 * @Description: 基础的路径和方法
 */

// 声明基础请求路径
var protocol = 'http:'
if (location.protocol == "https:") { // 判断传输协议是http还是https
    protocol = 'https:'
}

/**
 * @description 请求数据的get方法
 * @param {string} _url  发送数据的路径
 * @param {object} _data    要发送的数据
 * @param {function} callback   发送成功的回调
 * @param {function} errback    发送失败的回调
 */
function getAjaxHttpsRequest(_url, callback, errback) {
    // 调用jq中的ajax方法
    $.ajax({
        // 将参数传递到方法的配置中
        type: 'get',
        url: _url,
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        timeout: 3000,
        // 成功请求成功后的回调函数
        success: function (data) {
            callback(data)
        },
        error: function (a, e) {
            errback && errback(e)
        }
    });
}

/**
 * @description 向后台发送数据的异步方法
 * @param {string} _url  发送数据的路径
 * @param {object} _data    要发送的数据
 * @param {function} callback   发送成功的回调
 * @param {function} errback    发送失败的回调
 */
function ajaxHttpsRequest(_url, _data, callback, errback) {
    // 调用jq中的ajax方法
    $.ajax({
        // 将参数传递到方法的配置中
        type: 'post',
        url: _url,
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        data: _data,
        timeout: 3000,
        // 成功请求成功后的回调函数
        success: function (data) {
            callback(data)
        },
        error: function (a, e) {
            errback && errback(e)
        }
    });
}

/**
 * @description 向后台发送数据的同步方法
 * @param {string} _url  发送数据的路径
 * @param {object} _data    要发送的数据
 * @param {function} callback   发送成功的回调
 * @param {function} errback    发送失败的回调
 */
function ajaxAsyncHttpsRequest(_url, _data, callback, errback) {
    // 调用jq中的ajax方法
    $.ajax({
        // 将参数传递到方法的配置中
        type: 'post',
        url: _url,
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 3000,
        data: _data,
        // 成功请求成功后的回调函数
        success: function (data) {
            callback(data)
        },
        error: function (a, e) {
            errback && errback(e)
        }

    });
}

/**
 * @description  格式化时间插件
 * @param {Date} date 要格式化的时间 如: new Date()
 * @param {int} flag 返回的时间格式类型 可以不传 则返回2019-03-02  传1则返回2019年03月07日 传2 则返回2019.03.02
 * @returns {string} 格式化好的时间 如 2019-03-02
 */
function formatterDate(date,flag) {
    if (flag == 1) {
        var strDate = date.getFullYear() + "年";
        if (date.getMonth() < 10) {
            var s = date.getMonth() + 1 + "月";
            strDate += "0" + s;
        } else {
            strDate += date.getMonth() + 1 + "月";
        }
        if (date.getDate() < 10) {
            strDate += "0" + date.getDate() + "日"
        } else {
            strDate += date.getDate() + "日"
        }
        return strDate;
    } else if(flag == 2){
        var strDate = date.getFullYear() + ".";
        if (date.getMonth() < 10) {
            var s = date.getMonth() + 1 + ".";
            strDate += "0" + s;
        } else {
            strDate += date.getMonth() + 1 + ".";
        }
        if (date.getDate() < 10) {
            strDate += "0" + date.getDate();
        } else {
            strDate += date.getDate();
        }
        return strDate;
    }else{
        var strDate = date.getFullYear() + "-";
        if (date.getMonth() < 10) {
            var s = date.getMonth() + 1 + "-";
            strDate += "0" + s;
        } else {
            strDate += date.getMonth() + 1 + "-";
        }
        if (date.getDate() < 10) {
            strDate += "0" + date.getDate();
        } else {
            strDate += date.getDate();
        }
        return strDate;
    }
}

/**
 * @description 根据出生日期计算年龄差
 * @param {string} strBirthday 出生日期  格式 2019-03-03或2019-02-02T10:20:30
 * @returns 年龄
 */
function GetAge(strBirthday) {
    var returnAge;
    strBirthday = strBirthday.split('T')[0]
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; //日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; //月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge; //返回周岁年龄
}

/**
 * @description  获取本周第i天日期 从0开始计数
 * @param {int} i 获取第几天的 周一传入0 周日传入6
 * @param {int} flag 返回的时间格式 传入不为false的值 则返回 2019年03月02日
 * @returns {string} 格式化好的日期 (2019-03-05)
 */
function getWeek(i, flag) {
    var now = new Date();
    var firstDay = new Date(now - (now.getDay() - 1) * 86400000)
    firstDay.setDate(firstDay.getDate() + i);
    mon = Number(firstDay.getMonth()) + 1;
    if (flag) {
        return now.getFullYear() + "年" + mon + "月" + firstDay.getDate() + "日"
    } else {
        return now.getFullYear() + "-" + mon + "-" + firstDay.getDate();
    }
}

/**
 * @description 获取本月第一天的日期
 * @returns Date()对象 使用时用formatterDate()方法格式化一下
 */
function getCurrentMonthFirst() {
    var date=new Date();
    date.setDate(1);
    return date;
}

/**
 * @description 获取本月最后一天的日期
 * @returns Date()对象 使用时用formatterDate()方法格式化一下
 */
function getCurrentMonthLast() {
    var date=new Date();
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    return new Date(nextMonthFirstDay-oneDay);
}

/**
 * @description 调用app内的方法
 * @param {string} funName  要调用的方法的名称
 * @param {object} funParam  传入的参数对象
 */
function userAppmethods(funName, funParam) {
    var obj = {
        MethodName: funName,
        Parameters: funParam
    }
    try {
        MobileNa.call(JSON.stringify(obj))   // 调用安卓端的方法
    } catch(err) {}

    try {
        MobileNaCall(JSON.stringify(obj))   // 调用IOS端的方法
    } catch(err) {}
}

/**
 * @description 获取userJID，如果userJID不为空则返回userJID，否则返回字符串“userJID”
 * @return userJID
 */
function getUserJID(){
    var userJid = getUrlParam("userJID");
    if(userJid){
        return userJid;
    }
    // return "enpAaW0uc2luby1tZWQubmV0";
}

/**
 * @description 获取url中的参数
 * @param name 获取参数的名称
 * @returns {null}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

/**
 * @description 解析base64编码的字符串
 * @param str 需要解析的字符串
 * @returns 返回解析后的字符串
 */
function decodeBase64(str) {
    var base = new Base64();
    return base.decode(str);
}

/**
 * @description 编码与解码base64的原型对象
 * decode 解码
 * encode 编码
 *
 * Base64 encode / decode
 *
 * @author haitao.tu
 * @date 2010-04-26
 * @email tuhaitao@foxmail.com
 *
 */
function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

/**
 * js截取字符串，中英文都能用,中文一个字符占2位，如果截取长度小于字符串实际长度则以…结尾
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 * @return 截取后的字符串
 */
function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            if(str_len*2>len){
                str_cut = str_cut.concat("...");
            }
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length <= len) {
        return str;
    }
}

//兼容安卓滚动
function scrollToView(height) {
    $("#msgSend").css("bottom",height);
}

/*
 * @Author: 王新
 * @Date: 2019-07-05 10:08:52
 * @LastEditors: 王新
 * @LastEditTime: 2019-07-05 16:55:36
 * @Description: 封装常用的的工具函数
 */

var Device = {}

/**
 * @description: 判断浏览器类型
 * @return 浏览器类型的参数
 */
Device.getType = function () {
    var userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('windows')) { // 在windows环境下
        if (userAgent.indexOf('edge') != -1) { // 在Edge浏览器环境下
            return 'edge'
        } else if (userAgent.indexOf('msie') != -1) { // 在ie浏览器下
            return "ie"
        } else if (userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1) { // 在ie11浏览器下
            return "ie11"
        } else if (userAgent.indexOf('firefox') != -1) { // 在火狐浏览器下
            return "firefox"
        } else if (userAgent.indexOf('ubrowser') != -1) { // uc浏览器
            return "uc"
        } else if (userAgent.indexOf('qqbrowser') != -1) { // QQ浏览器下
            return "qq"
        } else if (userAgent.indexOf('se 2.x') != -1) { // 判断是会否为搜狗浏览器
            return "sougou"
        } else {
            return 'chrome'
        }
    } else if (userAgent.indexOf('android')) { // 在安卓设备中
        if (userAgent.indexOf('qq') != -1) { // 在安卓的QQ浏览器中
            return 'Android_qq'
        } else if (userAgent.indexOf('uc')) { // 在uc浏览器中
            return "Android_uc"
        } else {
            return "Android_chrome"
        }
    } else if (userAgent.indexOf('iphone') != -1) { // 在苹果设备中
        if (userAgent.indexOf('uc') != -1) { // uc浏览器
            return "iphone_uc"
        } else if (userAgent.indexOf('qq') != -1) { // qq浏览器
            return "iphone_qq"
        } else if (userAgent.indexOf('safari') != -1 && navigator.vendor.indexOf('Apple')) { //  苹果safari浏览器
            return "iphone_safari"
        } else {
            return "iphone_chrome"
        }
    } else if (userAgent.indexOf('ipad')) { // 苹果pad端
        if (userAgent.indexOf('uc') != -1) { // uc浏览器
            return "ipad_uc"
        } else if (userAgent.indexOf('qq') != -1) { // qq浏览器
            return "ipad_qq"
        } else if (userAgent.indexOf('safari') != -1 && navigator.vendor.indexOf('Apple')) { //  苹果safari浏览器
            return "ipad_safari"
        } else {
            return "ipad_chrome"
        }
    } else if (userAgent.indexOf('macintosh')) { // 苹果mac端
        if (userAgent.indexOf('uc') != -1) { // uc浏览器
            return "mac_uc"
        } else if (userAgent.indexOf('qq') != -1) { // qq浏览器
            return "mac_qq"
        } else if (userAgent.indexOf('safari') != -1 && navigator.vendor.indexOf('Apple')) { //  苹果safari浏览器
            return "mac_safari"
        } else {
            return "mac_chrome"
        }
    } else {
        return "other_chrome"
    }
}

/**
 * @description 判断设备系统类型
 * @return 返回设备系统类型
 */
Device.getSysType = function () {
    var userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('windows')) {
        return 'windows'
    } else if (userAgent.indexOf('android')) {
        return 'android'
    } else if (userAgent.indexOf('macintosh')) {
        return 'mac'
    } else if (userAgent.indexOf('iphone')) {
        return "iphone"
    } else if (userAgent.indexOf('ipad')) {
        return 'ipad'
    } else {
        return 'other'
    }
}

/**
 * @description 判断当前应用程序是是APP
 * @return {Boolean} 是APP返回true 不是APP返回false
 */
Device.isMyApp = function () {
    var userAgent = navigator.userAgent.toLowerCase()
    var defindStr = '' // 和APP人员协议好的字符串
    if (userAgent.indexOf(defindStr) != -1) {
        return true
    } else {
        return false
    }
}


/**
 * @description 倒计时方法 按秒计算
 * @param {Number} sec 倒计时时间 秒
 * @param {Function} callback1 执行倒计时的回调函数 一个参数为当前剩余秒数
 * @param {Function} callback2 倒计时执行完毕后的回调函数 无参数
 * @return null
 */
function countDown(sec, callback1, callback2) {
    var count = sec
    callback1 && callback1(count)
    var setintervalID = setInterval(function () {
        count--;
        callback1 && callback1(count)
        if (count <= 0) {
            callback2 && callback2()
            clearInterval(setintervalID)
            setintervalID = null
        }
    }, 1000)
}
