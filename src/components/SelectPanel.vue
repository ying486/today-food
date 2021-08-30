<template>
  <a-form class="select-panel" :form="form">
    <a-row>
      <a-col
        v-for="(item, key) in config"
        :key="key"
        :span="item.colSpan ? item.colSpan : 8"
      >
        <a-form-item
          class="form-item"
          :label="item.label"
          :label-col="item.labelCol ? item.labelCol : { span: 4 }"
          :wrapper-col="item.wrapperCol ? item.wrapperCol : { span: 4 }"
        >
          <a-select
            v-model:value="form[item.key]"
            allowClear
            placeholder="请选择"
            :mode="item.mode ? item.mode : 'default'"
            :maxTagCount="3"
            @change="onChange"
          >
            <a-select-option
              v-for="(opt, index) in item.optList"
              :key="index"
              :value="opt.value"
            >
              {{ opt.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-input-search
      v-model:value="form.search"
      placeholder="搜索"
      style="width: 200px"
      allowClear
      @change="onSearch"
    />
  </a-form>
</template>

<script>
import { defineComponent, toRefs, reactive } from "vue";

export default defineComponent({
  props: {
    config: Array,
  },
  async setup(props, { emit }) {
    const { config } = toRefs(props);

    // 创建对象
    const getKey = (arr) => {
      let obj = {};
      arr.forEach(({ key, mode }) => {
        switch (mode) {
          case "multiple":
          case "tags":
            obj[key] = [];
            break;
          default:
            obj[key] = "";
            break;
        }
      });
      obj.search = "";
      return obj;
    };

    const form = reactive(getKey(config.value));

    // 返回结果
    const onChange = () => {
      for (const key in form) {
        if (form[key] === undefined) {
          form[key] = "";
        }
      }
      emit("selData", form);
    };

    // 防抖
    let timeout = 0;
    const onSearch = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        emit("selData", form);
      }, 2000);
    };
    return {
      form,
      onChange,
      onSearch,
    };
  },
});
</script>

<style scoped lang="less">
.select-panel {
}
</style>
