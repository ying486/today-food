/**
 * @function 返回有值的属性对象
 * @param obj {Object}
 * @return {Object}
 */
export const delNullprop = (obj) => {
  let newObj = {};
  Object.keys(obj).map((item) => {
    if (obj[item]) {
      newObj[item] = obj[item];
    }
  });
  return newObj;
};

/**
 * @function 数据库请求(闲置)
 */
// export const dbRequest = async ({
//   db,
//   funcName,
//   data,
//   success = "成功",
//   error = "失败",
// }) => {
//   try {
//     const res = await db[funcName](data);
//     if (res) {
//       message.error(error);
//       throw res;
//     }
//     message.success(success);
//   } catch (err) {
//     console.log("出错了:" + err);
//     message.error(error);
//     throw err;
//   }
// };

/**
 * @function 日期时间格式化
 * @param fmt {String} 例；yyyy-MM-dd HH:mm:ss
 * @return {String}
 */
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
