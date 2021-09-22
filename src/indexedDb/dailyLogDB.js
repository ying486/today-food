import { nanoid } from "nanoid";
import indexedDb from "./index";

const USER_NAME = "admin";
const db = indexedDb && indexedDb.daily_log;

const dailyLogDB = {
  /**
   * @function 添加记录
   * @param data {object}
   * @return void
   */
  addData: async (data) => {
    const time = new Date().Format("yyyy-MM-dd HH:mm:ss");
    await db
      .add({
        data,
        logId: nanoid(),
        createdTime: time,
        createdBy: USER_NAME,
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default dailyLogDB;
