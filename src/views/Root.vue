<template>
  <a-layout class="layout-container" style="min-height: 100vh">
    <a-layout-sider collapsible defaultCollapsed>
      <div :style="{ height: '70px' }">
        <!-- <FrownOutlined :style="{ fontSize: ' 40px' }" @click="onSwitchMode" /> -->
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['choose']"
        @click="toRoute"
      >
        <a-menu-item key="Choose">
          <CoffeeOutlined />
          <span>抽抽乐</span>
        </a-menu-item>
        <a-menu-item key="Menu">
          <InsertRowAboveOutlined />
          <span>菜单</span>
        </a-menu-item>
        <a-menu-item key="MenuTb">
          <DatabaseOutlined />
          <span>菜单管理</span>
        </a-menu-item>
        <!-- <a-menu-item key="Seasoner">
          <span>调味料</span>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- <a-layout-header class="layout-header">ceshi</a-layout-header> -->
      <a-layout-content class="layout-content">
        欢迎来到管理者模式
        <div>
          <suspense>
            <router-view />
          </suspense>
        </div>
      </a-layout-content>

      <a-layout-footer class="layout-footer">
        APP ©2021 Created by GREEN
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import {
  CoffeeOutlined,
  DatabaseOutlined,
  InsertRowAboveOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    CoffeeOutlined,
    DatabaseOutlined,
    InsertRowAboveOutlined,
  },
  setup() {
    const router = useRouter();

    // 路由跳转
    const toRoute = ({ key }) => {
      router.push({ name: "root" + key });
    };

    // 模式切换
    const onSwitchMode = () => {};

    return {
      // func
      toRoute,
      onSwitchMode,
    };
  },
});
</script>
<style scoped lang="less">
.layout-container {
  .layout-header {
    background-color: #fff;
    margin: 0 0 16px 0;
  }
  .layout-content {
    margin: 0 16px;
    padding: 24px;
    background-color: #fff;
    min-height: 360px;
  }
  .layout-footer {
    padding: 10px;
    text-align: center;
  }
}
</style>
