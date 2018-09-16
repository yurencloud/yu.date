var date = require('./src/index')

test('日期转字符串', () => {
    // 1537091113123 2018-09-16 17:45:13.123
    var now = date.parse('2018-09-16 17:45:13.123', 'yyyy-MM-dd hh:mm:ss.SSS')

    expect(date.format(now, 'yyyy-MM-dd hh:mm:ss.SSS')).toBe('2018-09-16 17:45:13.123')
    expect(date.format(now, 'yyyy-MM-dd hh:mm:ss')).toBe('2018-09-16 17:45:13')
    expect(date.format(now, 'yyyy-MM-dd hh:mm')).toBe('2018-09-16 17:45')
    expect(date.format(now, 'yyyy-MM-dd')).toBe('2018-09-16')
    expect(date.format(now, 'yyyy-MM')).toBe('2018-09')
    expect(date.format(now, 'MM-dd')).toBe('09-16')
    expect(date.format(now, 'yyyy')).toBe('2018')
    expect(date.format(now, 'MM')).toBe('09')
    expect(date.format(now, 'dd')).toBe('16')

    expect(date.format(now, 'yyyy年MM月dd日 hh时mm分ss秒SSS毫秒')).toBe('2018年09月16日 17时45分13秒123毫秒')
})

test('字符串转日期', () => {
    // 1537091113123 2018-09-16 17:45:13.123
    expect(date.parse('2018-09-16 17:45:13.123', 'yyyy-MM-dd hh:mm:ss.SSS').getTime()).toBe(1537091113123)
    expect(date.parse('2018-09-16 17:45:13', 'yyyy-MM-dd hh:mm:ss').getTime()).toBe(1537091113000)
    expect(date.parse('2018-09-16 17:45', 'yyyy-MM-dd hh:mm').getTime()).toBe(1537091100000)
    expect(date.parse('2018-09-16', 'yyyy-MM-dd').getTime()).toBe(1537027200000)
    expect(date.parse('2018-09', 'yyyy-MM').getTime()).toBe(1535731200000)
    expect(date.parse('09-16', 'MM-dd').getTime()).toBe(22262400000) // 起始缺失的补 1970, 0, 1
    expect(date.parse('2018', 'yyyy').getTime()).toBe(1514736000000)

    expect(date.parse('2018年09月16日 17时45分13秒123毫秒', 'yyyy年MM月dd日 hh时mm分ss秒SSS毫秒').getTime()).toBe(1537091113123)
})

test('时间转换友好的显示格式', () => {
    var from = new Date(1537091113123)

    var now = new Date(1537091113123+1-(10*1000))
    var second = new Date(1537091113123+1-(60*1000))
    var minute = new Date(1537091113123+1-60*60*1000)
    var hour = new Date(1537091113123+1-24*60*60*1000)
    var day = new Date(1537091113123+1-31*24*60*60*1000)
    var month = new Date(1537091113123+1-11*31*24*60*60*1000)
    var year = new Date(1537091113123+1-4*365*24*60*60*1000)
    var long = new Date(1537091113123-5*366*24*60*60*1000)

    expect(date.from(now, from)).toBe('刚刚')
    expect(date.from(second, from)).toBe('59秒前')
    expect(date.from(minute, from)).toBe('59分钟前')
    expect(date.from(hour, from)).toBe('23小时前')
    expect(date.from(day, from)).toBe('30天前')
    expect(date.from(month, from)).toBe('10月前')
    expect(date.from(year, from)).toBe('4年前')
    expect(date.from(long, from)).toBe('很久之前')

    expect(date.from(from, now)).toBe('即将')
    expect(date.from(from, second)).toBe('59秒后')
    expect(date.from(from, minute)).toBe('59分钟后')
    expect(date.from(from, hour)).toBe('23小时后')
    expect(date.from(from, day)).toBe('30天后')
    expect(date.from(from, month)).toBe('10月后')
    expect(date.from(from, year)).toBe('4年后')
    expect(date.from(from, long)).toBe('很久之后')

    expect(date.from(minute, from, {minutesAgo:' minutes ago'})).toBe('59 minutes ago')

})
