import Dexie from "dexie";

const dbName = "today_food_database";
// 创建数据库
const db = new Dexie(dbName);
// 这里可以定义版本号，后续修改表字段时可以增加版本号
db.version(10).stores({
  menu: `&foodId,foodName,*foodType,*season,*material,desc,updatedTime,createdTime,createdBy`,
  daily_log: `&logId,foodArr,createdTime,createdBy`,
});

console.log("创建/打开数据库成功");

export default db;
