<template>
  <a-tooltip>
    <template #title v-if="tip">{{ tip }}</template>
    <a-button>
      <template #icon><slot name="icon"></slot></template>
    </a-button>
  </a-tooltip>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: String,
    tip: String,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less"></style>
