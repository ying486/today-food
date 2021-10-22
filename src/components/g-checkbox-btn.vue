<template>
  <div class="checkbox-container">
    <span
      v-for="(item, index) in config"
      :key="index"
      :class="{ checked: isChecked(item.value) }"
      @click="onClick(item.value)"
    >
      {{ item.label }}
    </span>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "GCheckbox",
  props: {
    modelValue: {
      type: Array,
      default: () => undefined,
    },
    config: {
      type: Array,
      default: () => undefined,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    // 值绑定
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        console.log(val, "val");
        emit("update:modelValue", val);
      },
    });

    // 判断多选框是否选中
    const isChecked = (item) => {
      return model.value.includes(item);
    };

    const onClick = (item) => {
      if (model.value.includes(item)) {
        const index = model.value.findIndex((e) => e === item);
        model.value.splice(index, 1);
      } else {
        model.value.push(item);
      }
      emit("change", model.value);
    };

    return {
      model,
      isChecked,
      onClick,
    };
  },
});
</script>

<style lang="less">
.checkbox-container {
  span {
    display: inline-block;
    min-width: 80px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid @primary-color;
    margin: 0 10px;
    color: @primary-color;
    cursor: pointer;
  }
  .checked {
    color: #fff;
    background-color: @primary-color;
  }
}
</style>
