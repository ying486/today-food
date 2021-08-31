<template>
  <div class="menu">
    <select-panel :config="foodSelect" @selData="selData" />
    <div class="card-container">
      <food-card
        class="food-card"
        v-for="item in pageList"
        :key="item.menuId"
        :foodName="item.foodName"
        :typeList="item.foodType"
        @click="onShowEditModal(item)"
      />
    </div>
    <a-button @click="onShowAddModal">添加数据</a-button>
    <add-menu-modal
      :data="foodInfo"
      :visible="visible"
      :title="modalTitle"
      @reData="getAddData"
    ></add-menu-modal>
    <a-pagination :pageSize="PAGE_SIZE" :total="total" @change="onPageChange" />
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, toRaw, watch } from "vue";
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
    // tesat.addData(); // 添加测试数据
    const PAGE_SIZE = 10;
    let total = ref(0);
    let state = reactive({
      foodList: [], // 总列表
      pageList: [], // 显示列表
      // 模态框数据初始化
      foodInfo: {},
      modalTitle: "",
      visible: false,
    });
    // 监听食物列表
    watch(state.foodList, (val) => {
      console.log(val, "state.foodList");
    });

    // 搜索面板
    const selData = async (data) => {
      console.log(toRaw(data), "data");
      const { foodType, season, search } = toRaw(data);
      state.foodList = await tesat.getBySelect({ foodType, season }, search);
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
        data.menuId && tesat.updateItem(data.menuId, data);
        !data.menuId &&
          tesat.addItem({
            ...data,
            menuId: nanoid(),
          });
        init();
      }
      // if (data && data.menuId) {

      //   init();
      //   // state.foodList = await tesat.getByPage(0, 10);
      // } else {
      //   tesat.addItem({
      //     ...data,
      //     menuId: nanoid(),
      //   });
      //   init();
      // }
      state.visible = false;
    };
    // 分页
    const onPageChange = async (page, pageSize) => {
      let begin = (page - 1) * pageSize;
      let end = page * pageSize < total.value ? page * pageSize : total.value;
      state.pageList = state.foodList.slice(begin, end);
    };
    // 数据初始化
    const init = async () => {
      console.log("初始化数据");
      state.foodList = await tesat.getAll(); //查询所有食物
      total.value = state.foodList.length; // 总页数
      state.pageList = state.foodList.slice(0, PAGE_SIZE);
    };
    init();

    return {
      PAGE_SIZE,
      foodSelect,
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
