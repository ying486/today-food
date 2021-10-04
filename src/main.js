import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue/es";
import "ant-design-vue/dist/antd.less";

import menuDb from "./indexedDb/menuDb";
import dailyLogDB from "./indexedDb/dailyLogDB";
import "./utils";
import "./assets/css/common.less";

const app = createApp(App);
app.config.globalProperties.$menuDb = menuDb; // 菜单表
app.config.globalProperties.$dailyLogDB = dailyLogDB; // 菜单表
app.use(Antd).use(store).use(router).mount("#app");
