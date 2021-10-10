<template>
  <div id="app">
    <div class="logo">
      <SmileOutlined
        class="switch-icon fs40"
        v-if="!rootMode"
        @click="onSwitchMode"
      />
      <FrownOutlined
        class="switch-icon fs40"
        v-if="rootMode"
        @click="onSwitchMode"
      />
    </div>
    <RollbackOutlined
      class="go-back fs40"
      v-if="showBackIc"
      @click="goBack()"
    />
    <suspense>
      <router-view />
    </suspense>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  SmileOutlined,
  FrownOutlined,
  RollbackOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    SmileOutlined,
    FrownOutlined,
    RollbackOutlined,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    let rootMode = ref(false);

    // 模式切换
    const onSwitchMode = () => {
      rootMode.value = !rootMode.value;
      const routerName = rootMode.value ? "Root" : "Pure";
      router.push({ name: routerName });
    };

    // 回退图标显示
    const showBackIc = computed(() => {
      const routeArr = route.path.match(/\w+/g);
      if (routeArr) {
        console.log(routeArr, "arr");
        console.log(!rootMode.value && routeArr.length > 1, "res");
        return !rootMode.value && routeArr.length > 1;
      }
      console.log("fase");
      return false;
    });

    // 回退
    const goBack = () => {
      router.back();
    };

    // 监听当前路由进行判断
    watch(
      () => route.path,
      (val) => {
        const routeArr = val.match(/\w+/g);
        rootMode.value = routeArr[0] === "Root" ? true : false;
      }
    );

    return {
      rootMode,
      showBackIc,
      // func
      onSwitchMode,
      goBack,
    };
  },
});
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .switch-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 999;
  }
  .go-back {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 999;
  }
}
</style>
