// 食物新增
export const addMenuRules = {
  foodName: [
    {
      required: true,
      message: "请输入菜品名",
      trigger: "blur",
      whitespace: true,
    },
  ],
  foodType: [
    {
      required: true,
      trigger: "change",
      validator: (rule, value) => {
        if (value.length === 0) {
          return Promise.reject("请选择类型");
        }
        return Promise.resolve();
      },
    },
  ],
  season: [
    {
      required: true,
      trigger: "change",
      validator: (rule, value) => {
        if (value.length === 0) {
          return Promise.reject("请选择季节");
        }
        return Promise.resolve();
      },
    },
  ],
  material: [
    {
      required: true,
      trigger: "change",
      validator: (rule, value) => {
        if (value.length === 0) {
          return Promise.reject("请选择原料");
        }
        return Promise.resolve();
      },
    },
  ],
};
