<template>
  <div class="pure-container">
    <div class="action-container flexr-cc">
      <CoffeeOutlined class="switch-icon fs40" @click="toRoute('Choose')" />
      <ContainerOutlined class="switch-icon fs40" @click="toRoute('Menu')" />
    </div>
    <suspense>
      <router-view />
    </suspense>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { CoffeeOutlined, ContainerOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    CoffeeOutlined,
    ContainerOutlined,
  },
  setup() {
    const router = useRouter();

    const toRoute = (key) => {
      router.push({ name: "pure" + key });
    };

    return { toRoute };
  },
});
</script>
<style scoped lang="less">
.pure-container {
  .action-container {
    width: 100%;
    height: 90px;
    .switch-icon {
      margin: 20px;
    }
  }
}
</style>
