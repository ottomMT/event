/**
 * 时间工具类
 */
module.exports = {
  /**
   * 获取当前时间(毫秒)
   */
  nowMillisecond(){
    return new Date().getTime();
  },
  /**
   * 获取当前时间(秒)
   */
  now(){
    return parseInt(new Date().getTime() / 1000, 10) || 0;
  },
  /**
   * 时间格式化
   * @param timestamp 时间戳(毫秒，默认当前时间)
   * @param format 格式(默认：yyyy-MM-dd hh:mm:ss)
   */
  format(timestamp, format = `yyyy-MM-dd hh:mm:ss`){
    const date = new Date(timestamp || new Date().getTime());
    const o = {
      'M+': date.getMonth() + 1,               // 月份
      'd+': date.getDate(),                    // 日
      'h+': date.getHours(),                   // 小时
      'm+': date.getMinutes(),                 // 分
      's+': date.getSeconds(),                 // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds()             // 毫秒
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return format;
  }
};
