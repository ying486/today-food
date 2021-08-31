<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo"></div>
      <a-menu
        theme="dark"
        :default-selected-keys="['Choose']"
        mode="inline"
        @click="toRoute"
      >
        <a-menu-item key="Choose">
          <span>Choose</span>
        </a-menu-item>
        <a-menu-item key="Menu">
          <span>Menu</span>
        </a-menu-item>
        <!-- <a-menu-item key="Material">
          <span>原料</span>
        </a-menu-item>
        <a-menu-item key="Seasoner">
          <span>调味料</span>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="layout-header">{{ title }}</a-layout-header>
      <a-layout-content class="layout-content">
        <div>
          <suspense>
            <router-view></router-view>
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
import router from "./router";

export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    toRoute({ key }) {
      this.title = key;
      router.push({ path: `/${key}` });
    },
  },
  created() {},
  unmounted() {},
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#components-layout-demo-side {
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
