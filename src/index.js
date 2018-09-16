'use strict';
/**
 * date
 * @description 封装date对象
 * @author mack wang
 * @website yurencloud.com
 */

var object = require('yu.object')

var SIGN_REGEXP = /([yMdhsmS])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
var DEFAULT_HUMANIZED = {
    ago: '刚刚',
    secondsAgo: '秒前',
    minutesAgo: '分钟前',
    hoursAgo: '小时前',
    daysAgo: '天前',
    monthsAgo: '月前',
    yearsAgo: '年前',
    longAgo: '很久之前',
    later: '即将',
    secondsLater: '秒后',
    minutesLater: '分钟后',
    hoursLater: '小时后',
    daysLater: '天后',
    monthsLater: '月后',
    yearsLater: '年后',
    longLater: '很久之后',
}

function padding(s, len) {
    len = len - (s + '').length;
    for (var i = 0; i < len; i++) {
        s = '0' + s;
    }
    return s;
}

var date = {}

/*
* 日期转字符串
* @param dateObject Date 日期对象
* @param pattern String 转化格式 yyyy-MM-dd hh:mm:ss.SSS
* @return dateFormatString String
* */
date.format = function (dateObject, pattern) {
    pattern = pattern || DEFAULT_PATTERN;
    return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
            case 'y':
                return padding(dateObject.getFullYear(), $0.length)
            case 'M':
                return padding(dateObject.getMonth() + 1, $0.length)
            case 'd':
                return padding(dateObject.getDate(), $0.length)
            case 'w':
                return dateObject.getDay() + 1
            case 'h':
                return padding(dateObject.getHours(), $0.length)
            case 'm':
                return padding(dateObject.getMinutes(), $0.length)
            case 's':
                return padding(dateObject.getSeconds(), $0.length)
            case 'S':
                return padding(dateObject.getMilliseconds(), $0.length)
        }
    });
}

/*
* 字符串转日期对象
* @param dateString String 格式化的日期字符串
* @param pattern String dateString的转化格式 yyyy-MM-dd hh:mm:ss.SSS
* @return date Date
* */
date.parse = function (dateString, pattern) {
    var matchs1 = pattern.match(SIGN_REGEXP)
    var matchs2 = dateString.match(/(\d)+/g)
    if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
            var _int = parseInt(matchs2[i])
            var sign = matchs1[i]
            switch (sign.charAt(0)) {
                case 'y':
                    _date.setFullYear(_int);
                    break;
                case 'M':
                    _date.setMonth(_int - 1);
                    break;
                case 'd':
                    _date.setDate(_int);
                    break;
                case 'h':
                    _date.setHours(_int);
                    break;
                case 'm':
                    _date.setMinutes(_int);
                    break;
                case 's':
                    _date.setSeconds(_int);
                    break;
                case 'S':
                    _date.setMilliseconds(_int);
                    break;
            }
        }
        return _date;
    }
    return null;
}

/*
* 时间转换友好的显示格式
* 输出格式：刚刚、10分钟前等
* @param to Date 终点时间
* @param from Date 起始时间（可选）
* @param options Object 提示语言文本修改（可选）
* @return fromTo String
* */
date.from = function (to, from, options) {
    // 从from到to时间过去多久了
    from = from || new Date()
    options = options || {}
    options = object.assign(DEFAULT_HUMANIZED, options)
    var time = to.getTime() - from.getTime()
    if (time >= 0) {
        switch (true) {
            case time < 10 * 1000:
                return options.later
            case time < 60 * 1000:
                return parseInt(time / 1000) + options.secondsLater
            case time < 60 * 60 * 1000:
                return parseInt(time / (60 * 1000)) + options.minutesLater
            case time < 24 * 60 * 60 * 1000:
                return parseInt(time / (60 * 60 * 1000)) + options.hoursLater
            case time < 31 * 24 * 60 * 60 * 1000:
                return parseInt(time / (24 * 60 * 60 * 1000)) + options.daysLater
            case time < 365 * 24 * 60 * 60 * 1000:
                return parseInt(time / (31 * 24 * 60 * 60 * 1000)) + options.monthsLater
            case time < 5 * 365 * 24 * 60 * 60 * 1000:
                return to.getFullYear() - from.getFullYear() + options.yearsLater
            case time >= 5 * 365 * 24 * 60 * 60 * 1000:
                return options.longLater
            default:
                return ''
        }
    } else {
        time = Math.abs(time)
        switch (true) {
            case time < 10 * 1000:
                return options.ago
            case time < 60 * 1000:
                return parseInt(time / 1000) + options.secondsAgo
            case time < 60 * 60 * 1000:
                return parseInt(time / (60 * 1000)) + options.minutesAgo
            case time < 24 * 60 * 60 * 1000:
                return parseInt(time / (60 * 60 * 1000)) + options.hoursAgo
            case time < 31 * 24 * 60 * 60 * 1000:
                return parseInt(time / (24 * 60 * 60 * 1000)) + options.daysAgo
            case time < 365 * 24 * 60 * 60 * 1000:
                return parseInt(time / (31 * 24 * 60 * 60 * 1000)) + options.monthsAgo
            case time < 5 * 365 * 24 * 60 * 60 * 1000:
                return from.getFullYear() - to.getFullYear() + options.yearsAgo
            case time >= 5 * 365 * 24 * 60 * 60 * 1000:
                return options.longAgo
            default:
                return ''
        }
    }
}

module.exports = date
