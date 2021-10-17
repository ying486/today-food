<template>
  <a-modal
    v-model:visible="showModal"
    :title="title"
    @ok="onOk"
    @cancel="onCancel"
    :maskClosable="false"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="addMenuRules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="菜品名称" name="foodName">
        <a-input
          v-model:value="formState.foodName"
          placeholder="请输入菜品名称"
        />
      </a-form-item>
      <a-form-item label="类型" name="foodType">
        <a-select
          v-model:value="formState.foodType"
          placeholder="请选择类型"
          mode="multiple"
          :options="foodTypeEnum"
        />
      </a-form-item>
      <a-form-item label="季节" name="season">
        <a-select
          v-model:value="formState.season"
          placeholder="请选择季节"
          mode="multiple"
          :options="seasonEnum"
        />
      </a-form-item>
      <a-form-item label="描述" name="desc">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { defineComponent, reactive, ref, toRaw, toRefs, watch } from "vue";
import { addMenuRules } from "../config/rules";
import { foodTypeEnum, seasonEnum } from "../enum";

export default defineComponent({
  props: {
    visible: Boolean,
    data: Object, // 食物信息
    title: String, // 标题
  },
  // emits: {
  //   reData: (val) => {
  //     console.log(val, "val");
  //     if (val.foodName) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // },
  setup(props, { emit }) {
    const { visible, data } = toRefs(props);
    const formRef = ref();
    let state = reactive({
      showModal: visible.value,
    });

    // 确认
    const onOk = () => {
      formRef.value
        .validate()
        .then(() => {
          emit("reData", toRaw(state.formState));
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    // 取消
    const onCancel = () => {
      emit("reData", false);
    };
    // 监听显示
    watch(visible, (val) => (state.showModal = val), {
      immediate: true,
    });
    watch(data, (val) => (state.formState = val), {
      immediate: true,
    });
    return {
      foodTypeEnum,
      seasonEnum,
      formRef,
      ...toRefs(state),
      addMenuRules,
      onOk,
      onCancel,
    };
  },
});
</script>
