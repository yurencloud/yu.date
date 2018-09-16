
## 安装
~~~
npm install --save yu.date
~~~
## 使用方法
~~~
var date = require('yu.date');

// 日期转字符串
// 2018-09-16 17:45:13.123
var s1 = date.format(new Date(1537091113123), 'yyyy-MM-dd hh:mm:ss.SSS')

// 2018-09-16
var s2 = date.format(new Date(1537091113000), 'yyyy-MM-dd')

// 字符串转日期对象
var d1 = date.parse('2018-09-16 17:45:13.123', 'yyyy-MM-dd hh:mm:ss.SSS')

var d2 = date.parse('2018-09-16', 'yyyy-MM-dd')

// 时间转换友好的显示格式,如：9分钟前
/*
* 时间转换友好的显示格式
* 输出格式：刚刚、10分钟前等
* @param to Date 终点时间
* @param from Date 起始时间（可选）
* @param options Object 提示语言文本修改（可选）
* @return fromTo String
* */
var ago = new Date(new Date().getTime() - 10*60*1000 + 1)
var h = date.from(ago)
~~~


> 具体使用方法见index.test.js，