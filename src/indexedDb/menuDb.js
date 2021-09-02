import { nanoid } from "nanoid";
import indexedDb from "./index";
import { delNullprop } from "../utils";

const USER_NAME = "admin";
const db = indexedDb && indexedDb.menu;

const menuDb = {
  /**
   * @function 添加测试数据
   * @param data {Array} 包含菜品信息的数组
   * @return void
   */
  addData: async (data) => {
    await db.bulkAdd(data);
  },

  /**
   * @function 添加一条菜品信息
   * @param data {Object} 菜品信息
   * @return void
   */
  addItem: async (data) => {
    const time = new Date().Format("yyyy-MM-dd HH:mm:ss");
    await db
      .add({
        ...data,
        foodId: nanoid(),
        updatedTime: time,
        createdTime: time,
        createdBy: USER_NAME,
      })
      .catch((err) => {
        console.error(err);
      });
  },

  /**
   * @function 查询菜品数据
   * @return {Array} 包含所有菜品对象的数组
   */
  getAll: async () => {
    let menuArr = [];
    menuArr = await db.toArray().catch((err) => {
      console.error(err);
    });
    return menuArr;
  },

  /**
   * @function 更新菜品数据
   * @param data {Object} 菜品信息
   */
  updateItem: async (data) => {
    const time = new Date().Format("yyyy-MM-dd HH:mm:ss");
    await db
      .where("menuId")
      .equals(data.menuId)
      .modify({
        ...data,
        updateTime: time,
      })
      .catch((err) => {
        console.error(err);
      });
  },

  /**
   * @function 查询
   * @param selVal {Object} 选择内容
   * @param searchVal {String} 搜索内容
   * @return {Array} 包含所有菜品对象的数组
   */
  getBySelect: async (selVal, searchVal) => {
    const handleObj = delNullprop(selVal);
    let menuArr = [];
    let flag = Object.keys(handleObj).length;
    menuArr = await (flag ? db.where(handleObj) : db)
      .filter((item) => item.foodName.search(searchVal) != -1)
      .toArray()
      .catch((err) => {
        console.error(err);
      });
    return menuArr;
  },
};

export default menuDb;
