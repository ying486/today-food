<template>
  <div class="food-card">
    <div class="name">{{ foodName }}</div>
    <div class="tag-panel">
      <a-tag v-for="item in chTypeList" :key="item.key">{{ item }}</a-tag>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue";
import { foodTypeEnum } from "@/views/enum";

export default defineComponent({
  name: "FoodCard",
  props: {
    foodName: String,
    typeList: Array,
  },
  setup(props) {
    const { typeList } = toRefs(props);
    // 枚举转化
    let chTypeList = typeList.value.map((item) => {
      return foodTypeEnum.find((e) => e.value === item).label;
    });
    return {
      chTypeList,
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
