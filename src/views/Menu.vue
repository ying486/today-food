<template>
  <div class="menu">
    <select-panel :config="foodSelect" @selData="selData" />
    <div class="card-container">
      <food-card
        class="food-card"
        v-for="item in pageList"
        :key="item.foodId"
        :name="item.foodName"
        :typeList="item.foodType"
        :desc="item.desc"
        :season="item.season"
      />
      <!-- @click="onShowEditModal(item)" -->
    </div>
    <div class="btn-bar">
      <a-button @click="onShowAddModal">添加数据</a-button>
      <a-button @click="onDel">删除数据</a-button>
      <a-button @click="onUploadExl">导入数据</a-button>
      <a-button @click="onExportExl">导出数据</a-button>
    </div>
    <add-menu-modal
      :data="foodInfo"
      :visible="visible"
      :title="modalTitle"
      @reData="getAddData"
    ></add-menu-modal>
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
import addMenuModal from "./modals/addMenuModal.vue";
import Excel from "../utils/excel";

export default defineComponent({
  components: {
    foodCard,
    SelectPanel,
    addMenuModal,
  },
  async setup() {
    const { $menuDb } = getCurrentInstance().appContext.config.globalProperties; // menu数据库方法
    const PAGE_SIZE = 10;
    let currentPage = ref(1);
    let total = ref(0);
    let state = reactive({
      foodList: [], // 总列表
      pageList: [], // 显示列表
      // 模态框数据初始化
      foodInfo: {},
      modalTitle: "",
      visible: false,
    });

    // 搜索面板
    const selData = async (data) => {
      console.log(toRaw(data), "data");
      const { foodType, season, search } = toRaw(data);
      state.foodList = await $menuDb.getBySelect({ foodType, season }, search);
      onPageChange(currentPage.value, PAGE_SIZE);
    };

    const onShowAddModal = () => {
      state.foodInfo = {
        foodName: "",
        foodType: [],
        season: [],
        material: [],
        desc: "",
      };
      state.modalTitle = "新增菜品";
      state.visible = true;
    };
    const onShowEditModal = (data) => {
      state.foodInfo = data;
      state.modalTitle = "修改菜品信息";
      state.visible = true;
    };

    // 添加食物
    const getAddData = async (data) => {
      if (data) {
        data.foodId && $menuDb.updateItem(data);
        !data.foodId && $menuDb.addItem(data);
        init();
      }
      state.visible = false;
    };

    // 删除数据
    const onDel = (e) => {
      console.log(e, "e");
      e.target.innerHTML =
        e.target.innerHTML === "删除数据" ? "取消删除" : "删除数据";
      // state.foodList.forEach
    };

    // 导入数据
    const onUploadExl = () => {
      Excel.importExcel(async (data) => {
        console.log(data, "data");
        await $menuDb.addItemList(data);
        init();
      });
    };

    // 导出数据
    const onExportExl = () => {
      Excel.exportExcel(state.foodList, "ceshi");
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
      selData,
      onShowAddModal,
      onShowEditModal,
      getAddData,
      onDel,
      onPageChange,
      onUploadExl,
      onExportExl,
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
