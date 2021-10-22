<template>
  <div class="menu">
    <select-panel :config="foodSelect" @selData="selData" />
    <div class="card-container">
      <food-card
        class="food-card"
        v-for="item in pageList"
        :key="item.foodId"
        :name="item.foodName"
        :season="item.season"
        :typeList="item.foodType"
        :desc="item.desc"
      />
    </div>
    <a-pagination
      class="pagination"
      v-model:current="currentPage"
      :pageSize="PAGE_SIZE"
      :total="total"
      @change="onPageChange"
    />
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  toRaw,
  getCurrentInstance,
} from "vue";
import { foodSelect } from "./config/selectPanel";
import SelectPanel from "../components/SelectPanel.vue";
import foodCard from "../components/FoodCard.vue";

export default defineComponent({
  components: {
    foodCard,
    SelectPanel,
  },
  async setup() {
    const { $menuDb } = getCurrentInstance().appContext.config.globalProperties; // menu数据库方法
    const PAGE_SIZE = 10;
    let currentPage = ref(1);
    let total = ref(0);
    let state = reactive({
      foodList: [], // 总列表
      pageList: [], // 显示列表
    });

    // 搜索面板
    const selData = async (data) => {
      console.log(toRaw(data), "data");
      const { foodType, season, search } = toRaw(data);
      state.foodList = await $menuDb.getBySelectWithSearch(
        { foodType, season },
        search
      );
      onPageChange(currentPage.value, PAGE_SIZE);
    };

    // 分页
    const onPageChange = async (page, pageSize) => {
      console.log(page, pageSize);
      total.value = state.foodList.length; // 总页数
      let begin = (page - 1) * pageSize;
      let end = page * pageSize < total.value ? page * pageSize : total.value;
      state.pageList = state.foodList.slice(begin, end);
    };

    // 数据初始化
    const init = async () => {
      state.foodList = await $menuDb.getAll(); //查询所有食物
      state.pageList = state.foodList.slice(0, PAGE_SIZE);
      onPageChange(currentPage.value, PAGE_SIZE);
    };
    init();

    return {
      PAGE_SIZE,
      currentPage,
      foodSelect,
      total,
      ...toRefs(state),
      // func
      selData,
      onPageChange,
    };
  },
});
</script>

<style lang="less">
.menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .card-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .food-card {
      margin: 10px;
    }
  }
  .pagination {
  }
}
</style>
