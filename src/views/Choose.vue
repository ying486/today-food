<template>
  <div class="choose-container">
    <a-card
      v-for="(item, index) in chooseList"
      :key="index"
      style="width: 300px"
    >
      <a-select v-model:value="item.value" style="width: 200px">
        <a-select-option
          v-for="(opt, index) in foodTypeEnum"
          :key="index"
          :value="opt.value"
          >{{ opt.label }}</a-select-option
        >
      </a-select>
    </a-card>
    <a-card @click="onAddCard" style="width: 300px"></a-card>
    <a-button @click="onRandomFood">cehsi</a-button>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  // ref,
  // toRaw,
  getCurrentInstance,
} from "vue";
import { nanoid } from "nanoid";
import { foodTypeEnum } from "./enum";

export default defineComponent({
  components: {},
  async setup() {
    const { $menuDb } = getCurrentInstance().appContext.config.globalProperties; // menu数据库方法
    let state = reactive({
      chooseList: [
        {
          id: "1",
          value: "",
        },
        {
          id: "2",
          value: "",
        },
      ],
    });
    console.log("ceshi ", await $menuDb.getRandomItem({ foodType: "hc" }));
    const onRandomFood = async () => {
      console.log(state.chooseList, "choose");
      let arr = [];
      state.chooseList.forEach(async (item) => {
        arr.push(await $menuDb.getRandomItem({ foodType: item.value }));
      });
      setTimeout(() => {
        console.log(arr, "list");
      }, 1000);
    };
    const onAddCard = () => {
      console.log("添加");
      state.chooseList.push({ id: nanoid(), value: "" });
    };
    return {
      ...toRefs(state),
      foodTypeEnum,
      onRandomFood,
      onAddCard,
    };
  },
});
</script>

<style lang="less">
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
