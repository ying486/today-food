import { nanoid } from "nanoid";
import indexedDb from "./index";
import { menuData } from "../temp/data";

const USER_NAME = "admin";
const db = indexedDb && indexedDb.menu;

const menuDb = {
  addData: async () => {
    await db.bulkAdd(menuData);
  },

  // 添加一条消息记录
  addItem: async (data) => {
    const time = new Date().getTime();
    try {
      await db.add({
        ...data,
        foodId: nanoid(),
        updatedTime: time,
        createdTime: time,
        createdBy: USER_NAME,
      });
    } catch (err) {
      console.error(err);
    }
  },

  // 查询所有数据
  getAll: async () => {
    let menuArr = [];
    try {
      menuArr = await db.toArray();
    } catch (err) {
      console.error(err);
    }
    return menuArr;
  },
};

export default menuDb;
