export const menuTbColumns = [
  {
    title: "ID",
    dataIndex: "foodId",
  },
  {
    title: "名称",
    dataIndex: "foodName",
    width: 100,
  },
  {
    title: "类型",
    dataIndex: "foodType",
    slots: { customRender: "foodType" },
  },
  {
    title: "季节",
    dataIndex: "season",
    slots: { customRender: "season" },
  },
  {
    title: "更新时间",
    dataIndex: "updatedTime",
  },
  {
    title: "创建时间",
    dataIndex: "createdTime",
  },
  {
    title: "创建人",
    dataIndex: "createdBy",
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    align: "center",
    width: 100,
    slots: { customRender: "action" },
  },
];
