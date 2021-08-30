// 返回有值的属性对象
export const delNullprop = (obj) => {
  let newObj = {};
  Object.keys(obj).map((item) => {
    if (obj[item]) {
      newObj[item] = obj[item];
    }
  });
  return newObj;
};
