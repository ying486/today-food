<template>
  <div class="menu-tb">
    <div class="header-container">
      <span>
        {{ `共有 ${foodList.length} 条数据` }}
      </span>
      <div class="btn-container">
        <g-button tip="导入"
          ><template #icon><ImportOutlined /></template
        ></g-button>
        <g-button tip="导出"
          ><template #icon><ExportOutlined /></template
        ></g-button>
        <g-button tip="添加"
          ><template #icon><PlusSquareOutlined /></template
        ></g-button>
        <g-button tip="删除"
          ><template #icon><DeleteOutlined /></template
        ></g-button>
      </div>
    </div>
    <a-table
      rowKey="foodId"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="menuTbColumns"
      :data-source="foodList"
    >
      <template #foodType="{ text: foodType }">
        <a-tag
          v-for="item in foodTypeCvrt(foodType)"
          :key="item"
          :color="volcano"
        >
          {{ item }}
        </a-tag>
      </template>
      <template #season="{ text: season }">
        <span v-for="item in seasonCvrt(season)" :key="item">
          {{ item }}
        </span>
      </template>
      <template #action="{ record }">
        <span @click="onShowEditModal(record)">
          <FormOutlined :style="{ fontSize: '20px' }" />
          <!-- <a>edit</a> -->
        </span>
      </template>
    </a-table>
    <add-menu-modal
      :data="foodInfo"
      :visible="visible"
      :title="modalTitle"
      @reData="getAddData"
    ></add-menu-modal>
  </div>
</template>
<script>
import {
  // computed,
  defineComponent,
  reactive,
  toRefs,
  toRaw,
  getCurrentInstance,
} from "vue";
import { Modal, message } from "ant-design-vue";
import {
  FormOutlined,
  ImportOutlined,
  ExportOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons-vue";
import gButton from "../components/g-button.vue";
import addMenuModal from "./modals/addMenuModal.vue";
import { menuTbColumns } from "./config/colums";
import Excel from "../utils/excel";
import { foodTypeEnum, seasonEnum } from "@/views/enum";

export default defineComponent({
  components: {
    // SelectPanel,
    addMenuModal,
    FormOutlined,
    ImportOutlined,
    ExportOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    gButton,
  },
  async setup() {
    const { $menuDb } = getCurrentInstance().appContext.config.globalProperties; // menu数据库方法
    const state = reactive({
      selectedRowKeys: [], // 已选择行
      foodList: [], // 总列表
      // 模态框数据初始化
      foodInfo: {},
      modalTitle: "",
      visible: false,
    });

    // 食物类型枚举转化
    const foodTypeCvrt = (arr) => {
      return arr.map((item) => {
        return foodTypeEnum.find((e) => e.value === item).label;
      });
    };

    // 季节类型枚举转化
    const seasonCvrt = (arr) => {
      return arr.map((item) => {
        return seasonEnum.find((e) => e.value === item).label;
      });
    };

    const onSelectChange = (selectedRowKeys) => {
      state.selectedRowKeys = selectedRowKeys;
    };

    // 显示添加模态框
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

    // 显示编辑模态框
    const onShowEditModal = (data) => {
      state.foodInfo = data;
      state.modalTitle = "修改菜品";
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
    const onDel = () => {
      if (!state.selectedRowKeys.length) {
        message.info("请先选择需要删除的数据");
        return;
      }
      Modal.confirm({
        title: "提示",
        content: "是否确定删除？",
        okText: "确定",
        cancelText: "取消",
        async onOk() {
          // 删除操作
          const res = await $menuDb.delItemList(toRaw(state.selectedRowKeys));
          if (res) {
            message.error("删除失败");
            return;
          }
          message.success("删除成功");
          init();
        },
      });
    };

    // 导入数据
    const onUploadExl = () => {
      Excel.importExcel(async (data) => {
        const res = await $menuDb.addItemList(data);
        if (res) {
          message.error("导入失败");
          return;
        }
        message.success("导入成功");
        init();
      });
    };

    // 导出数据
    const onExportExl = () => {
      Excel.exportExcel(state.foodList, "ceshi");
    };

    // 数据刷新
    const init = async () => {
      state.foodList = await $menuDb.getAll(); //查询所有食物
    };
    init();

    return {
      menuTbColumns,
      ...toRefs(state),
      // func
      onSelectChange,
      onShowAddModal,
      getAddData,
      onShowEditModal,
      onDel,
      onUploadExl,
      onExportExl,
      foodTypeCvrt,
      seasonCvrt,
    };
  },
});
</script>
<style lang="less">
.menu-tb {
  .header-container {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
