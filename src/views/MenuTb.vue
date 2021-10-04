<template>
  <div class="menu-tb">
    <div class="action-container">
      <span style="margin-left: 8px">
        {{ `共有 ${foodList.length} 条数据` }}
      </span>
      <a-button @click="onUploadExl">导入</a-button>
      <a-button @click="onExportExl">导出</a-button>
      <a-button @click="onShowAddModal">添加</a-button>
      <a-button @click="onDel">删除</a-button>
    </div>
    <a-table
      rowKey="foodId"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="menuTbColumns"
      :data-source="foodList"
    />
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
import addMenuModal from "./modals/addMenuModal.vue";
import { menuTbColumns } from "./config/colums";
import Excel from "../utils/excel";

export default defineComponent({
  components: {
    // SelectPanel,
    addMenuModal,
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
      onDel,
      onUploadExl,
      onExportExl,
    };
  },
});
</script>
<style lang="less">
.menu-tb {
  .action-container {
    margin-bottom: 16px;
  }
}
</style>
