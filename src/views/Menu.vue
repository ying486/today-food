<template>
  <div class="menu">
    <select-panel :config="foodSelect" @selData="selData" />
    <div class="card-container">
      <food-card
        class="food-card"
        v-for="item in foodList"
        :key="item.id"
        :foodName="item.foodName"
        :typeList="item.foodType"
        @click="onShowEditModal(item)"
      />
    </div>
    <a-button @click="onShowAddModal">添加数据</a-button>
    <add-menu-modal
      :fData="foodInfo"
      :visible="visible"
      :title="modalTitle"
      @reData="getAddData"
    ></add-menu-modal>
    <a-pagination
      v-model:current="currentPage"
      :total="total"
      @change="onPageChange"
    />
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, toRaw } from "vue";
import { foodSelect } from "./config/selectPanel";
import { nanoid } from "nanoid";
import SelectPanel from "../components/SelectPanel.vue";
import foodCard from "../components/FoodCard.vue";
import indexedDb from "../indexedDb";
import addMenuModal from "./modals/addMenuModal.vue";

const tesat = new indexedDb();

export default defineComponent({
  components: {
    foodCard,
    SelectPanel,
    addMenuModal,
  },
  async setup() {
    // tesat.addData();
    let currentPage = ref(1); // 当前页数
    let total = (await tesat.getAll()).length; // 总页数
    let state = reactive({
      foodList: [],
      foodInfo: {},
      modalTitle: "",
      visible: false,
    });
    state.foodList = await tesat.getByPage(0, 10); //查询所有食物

    // 搜索面板
    const selData = async (data) => {
      // const { type, season, search } = data;
      state.foodList = await tesat.getBySelect(toRaw(data));
      // if (data.search) {
      // } else {
      //   state.foodList = await tesat.getAll();
      // }
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
    const getAddData = (data) => {
      if (data) {
        tesat.addItem({
          ...data,
          menuId: nanoid(),
        });
        state.foodList.unshift(data);
      }
      state.visible = false;
    };
    // 分页
    const onPageChange = async (page, pageSize) => {
      console.log(page, pageSize);
      state.foodList = await tesat.getByPage((page - 1) * 10, pageSize);
    };
    return {
      foodSelect,
      currentPage,
      total,
      ...toRefs(state),
      selData,
      onShowAddModal,
      onShowEditModal,
      getAddData,
      onPageChange,
    };
  },
});
</script>

<style lang="less">
.menu {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    .food-card {
      margin: 10px;
    }
  }
}
</style>
