<template>
  <div class="food-card">
    <div class="name">{{ foodName }}</div>
    <div class="tag-panel">
      <a-tag v-for="(item, index) in chTypeList" :key="index">{{ item }}</a-tag>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, watch } from "vue";
import { foodTypeEnum } from "@/views/enum";

export default defineComponent({
  name: "FoodCard",
  props: {
    foodName: String,
    typeList: Array,
  },
  setup(props) {
    const { typeList } = toRefs(props);
    let state = reactive({
      chTypeList: [], // 枚举转换类型
    });
    // 食物类型枚举转化
    const foodTypeCvrt = (arr) => {
      return arr.map((item) => {
        return foodTypeEnum.find((e) => e.value === item).label;
      });
    };
    state.chTypeList = foodTypeCvrt(typeList.value);

    // 监听食物类型改变
    watch(typeList, (val) => (state.chTypeList = foodTypeCvrt(val)), {});

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="less">
.food-card {
  width: 150px;
  height: 200px;
  box-shadow: 0 0 10px 10px #f0f2f5 inset;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .name {
  }

  .tag-panel {
    width: 100%;
    padding: 5px;
  }
}
</style>
