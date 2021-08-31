import Dexie from "dexie";

const dbName = "today_food_database";
// 创建数据库
const db = new Dexie(dbName);
// 这里可以定义版本号，后续修改表字段时可以增加版本号
db.version(1).stores({
  // 创建表，&表示 primaryKey（++表示自增字段）
  menu: `&menuId,foodName,*foodType,*season,*material,updatedTime,createdTime,createBy`,
});

console.log("创建/打开数据库成功");

export default db;
