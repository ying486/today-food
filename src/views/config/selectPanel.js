import { foodTypeEnum, seasonEnum } from "../enum";

export const foodSelect = [
  {
    label: "种类",
    key: "foodType",
    optList: foodTypeEnum,
  },
  {
    label: "季节性",
    key: "season",
    optList: seasonEnum,
  },
];
