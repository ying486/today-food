//去除对象中值为undefined、null、""的键值对
export const delNullprop = (obj) => {
  //value为对象
  Object.keys(obj).map((item) => {
    if (!obj[item]) {
      delete obj[item];
    }
    return true;
  });
};
