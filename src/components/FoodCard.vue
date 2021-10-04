<template>
  <div class="food-card" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="front">
      <div class="name">{{ name }}</div>
      <a-tag class="tag">{{ typeStr }}</a-tag>
    </div>
    <!-- 背面 -->
    <div class="back">
      <span class="desc">
        {{ desc }}
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, watch } from "vue";
import { foodTypeEnum } from "@/views/enum";

export default defineComponent({
  name: "FoodCard",
  props: {
    name: String,
    typeList: Array,
    desc: String,
    season: String,
    // 卡片翻转
    flip: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { typeList, flip } = toRefs(props);
    let typeStr = ref("");
    // const color = ["#014483", "#03a877", "#a30404", "#0082aa"];
    // 食物类型枚举转化
    const foodTypeCvrt = (arr) => {
      return arr.map((item) => {
        return foodTypeEnum.find((e) => e.value === item).label;
      });
    };

    // 食物类型字符串拼接
    const toString = (arr) => {
      let str = "";
      let chTypeList = foodTypeCvrt(arr);
      chTypeList.forEach((item) => {
        str += `${item}|`;
      });
      return str.slice(0, str.length - 1);
    };

    typeStr.value = toString(typeList.value);

    // 监听鼠标进入
    const onMouseEnter = (e) => {
      flip.value && (e.target.className = "food-card mouse-enter");
    };

    // 监听鼠标离开
    const onMouseLeave = (e) => {
      flip.value && (e.target.className = "food-card");
    };

    // 监听食物类型改变
    watch(typeList, (val) => (typeStr.value = toString(val)), {});

    return {
      typeStr,
      onMouseEnter,
      onMouseLeave,
    };
  },
});
</script>

<style scoped lang="less">
.food-card {
  width: 150px;
  height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.5s ease;

  .front,
  .back {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    backface-visibility: hidden;
    background-color: #fff;
    box-shadow: 0 0 10px 10px #f0f2f5 inset;
    border-radius: 10px;
  }

  .front {
    .name {
      height: 70%;
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translate(-50%, 0);
      font-size: 18px;
      writing-mode: vertical-lr;
      letter-spacing: 10px;
    }
    .tag {
      width: 100%;
      position: absolute;
      bottom: 20px;
      letter-spacing: 5px;
      color: #fff;
      background-color: #014483;
    }
  }

  .back {
    padding: 25px;
    transform: rotateY(180deg);
    .desc {
      text-indent: 1em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
    }
  }
}
.mouse-enter {
  color: #014483;
  transform: rotateY(180deg);
  transition: all 0.5s ease;
}
</style>
