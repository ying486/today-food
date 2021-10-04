import { nanoid } from "nanoid";
import indexedDb from "./index";
import { delNullprop } from "../utils";

const USER_NAME = "admin";
const db = indexedDb && indexedDb.menu;

const menuDb = {
  /**
   * @function 添加一条菜品信息
   * @param data {Object} 菜品信息
   * @return {void}
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
        return err;
      });
  },

  /**
   * @function 添加多条数据
   * @param data {Array} 包含菜品信息的数组
   * @return {void}
   */
  addItemList: async (data) => {
    await db.bulkAdd(data).catch((err) => {
      console.error(err);
      return err;
    });
  },

  /**
   * @function 删除一条菜品信息
   * @param data {String} 主键(foodId)
   * @return {void}
   */
  delItem: async (data) => {
    await db.delete(data).catch((err) => {
      console.error(err);
      return err;
    });
  },

  /**
   * @function 删除多条菜品信息
   * @param data {Array} 删除对象的主键的数组
   * @return {void}
   */
  delItemList: async (data) => {
    await db.bulkDelete(data).catch((err) => {
      console.error(err);
      return err;
    });
  },

  /**
   * @function 查询所有菜品数据
   * @return {Array} 包含所有菜品对象的数组
   */
  getAll: async () => {
    return await db.toArray().catch((err) => {
      console.error(err);
      return err;
    });
  },

  /**
   * @function 更新菜品数据
   * @param data {Object} 菜品信息
   */
  updateItem: async (data) => {
    const time = new Date().Format("yyyy-MM-dd HH:mm:ss");
    await db
      .where("foodId")
      .equals(data.foodId)
      .modify({
        ...data,
        updateTime: time,
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  },

  /**
   * @function 查询
   * @param selVal {Object} 筛选条件
   * @param searchVal {String} 搜索内容
   * @return {Array} 包含所有菜品对象的数组
   */
  getBySelect: async (selVal, searchVal) => {
    const handleObj = delNullprop(selVal);
    let flag = Object.keys(handleObj).length;

    return await (flag ? db.where(handleObj) : db)
      .filter((item) => item.foodName.search(searchVal) != -1)
      .toArray()
      .catch((err) => {
        console.error(err);
        return err;
      });
  },

  /**
   * @function 通过食物类型随机获取某个菜品
   * @param data {Array} 食物类型
   * @return {Object} 菜品对象信息
   */
  getRandomItem: async (data) => {
    let foodArr = await db
      .where("foodType")
      .anyOf(data)
      .toArray()
      .catch((err) => {
        console.error("err", err);
        return err;
      });
    if (foodArr && foodArr.length) {
      let index = Math.floor(Math.random() * foodArr.length);
      return foodArr[index];
    } else {
      return { foodType: data, err: "暂无相关菜品，请重新选择" };
    }
  },
};

export default menuDb;
