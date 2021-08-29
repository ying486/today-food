import initDB from "./init";
import { menuData } from "../temp/data";
import { delNullprop } from "../lib";
let userName = "admin";

export default class MenuClass {
  constructor() {
    this.db = initDB && initDB.menu;
  }

  async addData() {
    await this.db.bulkAdd(menuData);
  }

  // 添加一条消息记录
  async addItem(data) {
    const time = new Date().getTime();
    try {
      await this.db.add({
        ...data,
        updatedTime: time,
        createdTime: time,
        createdBy: userName,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // 删除单条消息记录
  async delItemById(menuId) {
    try {
      await this.db.where({ menuId }).delete();
    } catch (err) {
      console.error(err);
    }
  }

  // 删除多条消息记录
  async delItemByIdArr(menuIdArr) {
    try {
      await this.db.where("msgId").anyOf(menuIdArr).delete();
    } catch (err) {
      console.error(err);
    }
  }

  // 更新数据
  async updateItem(menuId, data) {
    const time = new Date().getTime();
    try {
      await this.db
        .where("menuId")
        .equals(menuId)
        .modify({
          ...data,
          updateTime: time,
        });
    } catch (err) {
      console.error(err);
    }
  }

  // 查询所有数据
  async getAll() {
    let menuArr = [];
    try {
      menuArr = await this.db.toArray();
    } catch (err) {
      console.error(err);
    }
    return menuArr;
  }

  // 分页查询
  async getByPage(begin, pageSize) {
    let menuArr = [];
    try {
      menuArr = await this.db.offset(begin).limit(pageSize).toArray();
    } catch (err) {
      console.error(err);
    }
    return menuArr;
  }

  // 通过名字查找
  async getBySelect(obj) {
    delNullprop(obj);
    console.log(obj, "obj");
    let menuArr = [];
    try {
      menuArr = await this.db
        .where(obj)
        // .where("foodName")
        // .anyOfIgnoreCase(search)
        .toArray();
      console.log(menuArr, "menuArr");
    } catch (err) {
      console.error(err);
    }
    return menuArr;
  }
}
