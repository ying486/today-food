export const foodTypeEnum = [
  { label: "荤菜", value: "hc" },
  { label: "素菜", value: "sc" },
  { label: "汤类", value: "tl" },
  { label: "甜品", value: "tp" },
  { label: "面类", value: "ml" },
  { label: "主食", value: "zs" },
];

export const foodTypeMap = new Map([
  ["荤菜", "hc"],
  ["素菜", "sc"],
  ["汤类", "tl"],
  ["甜品", "tp"],
  ["面类", "ml"],
  ["主食", "zs"],
]);

export const seasonEnum = [
  { label: "一年四季", value: "0" },
  { label: "春季", value: "1" },
  { label: "夏季", value: "2" },
  { label: "秋季", value: "3" },
  { label: "冬季", value: "4" },
];

export const seasonMap = new Map([
  ["一年四季", "0"],
  ["春季", "1"],
  ["夏季", "2"],
  ["秋季", "3"],
  ["冬季", "4"],
]);

export const nameTransMap = new Map([
  ["foodId", "菜品编号"],
  ["foodName", "菜品名称"],
  ["foodType", "菜品类型"],
  ["season", "季节"],
  ["desc", "描述"],
  ["updatedTime", "更新时间"],
  ["createdTime", "创建时间"],
  ["createdBy", "创建人"],
]);
