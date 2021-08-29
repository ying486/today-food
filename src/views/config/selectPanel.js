import { foodTypeEnum, seasonEnum } from "../enum";

export const foodSelect = [
  {
    label: "种类",
    key: "foodType",
    optList: foodTypeEnum,
    colSpan: 6,
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  },
  {
    label: "季节性",
    key: "season",
    optList: seasonEnum,
    colSpan: 10,
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  },
];
