<template>
  <div class="choose-container">
    <div class="card-container">
      <div v-for="(item, index) in chooseList" :key="index">
        <!-- 选择卡 -->
        <a-card class="card" v-if="!item.foodId">
          <MinusOutlined class="del-btn" @click="onDelCard(index)" />
          <a-select v-model:value="item.foodType" style="width: 100px">
            <a-select-option
              v-for="(opt, optIndex) in foodTypeEnum"
              :key="optIndex"
              :value="opt.value"
              >{{ opt.label }}</a-select-option
            >
          </a-select>
          <p class="err-message" v-if="item.err">{{ item.err }}</p>
        </a-card>
        <!-- 展示卡 -->
        <food-card
          style="margin: 0 10px"
          :class="{ locked: item.locked && showBtnBar }"
          v-if="item.foodId"
          :name="item.foodName"
          :typeList="item.foodType"
          :desc="item.desc"
          :season="item.season"
          :flip="false"
          @click="onLocked(index)"
        />
      </div>
      <!-- 添加卡 -->
      <a-card
        class="card"
        v-if="showAddCard && chooseList.length < 5"
        @click="onAddCard"
      >
        <PlusOutlined :style="{ fontSize: '26px', color: '#666' }" />
      </a-card>
    </div>
    <div class="btn-bar" v-show="showBtnBar">
      <a-button class="btn" :disabled="showAddCard" @click="onResetAll"
        >全部重置</a-button
      >
      <a-button class="btn" :disabled="showAddCard" @click="onReset"
        >重置</a-button
      >
      <a-button class="btn" @click="onRandomFood">抽取</a-button>
      <a-button class="btn" @click="onRecord">记录</a-button>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  // toRaw,
  getCurrentInstance,
} from "vue";
import { Modal } from "ant-design-vue";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";
import { foodTypeEnum } from "./enum";
import foodCard from "../components/FoodCard.vue";

export default defineComponent({
  components: { foodCard, PlusOutlined, MinusOutlined },
  async setup() {
    const { $menuDb } = getCurrentInstance().appContext.config.globalProperties; // menu数据库方法
    const { $dailyLogDB } =
      getCurrentInstance().appContext.config.globalProperties; // dailyLogDB数据库方法
    let state = reactive({
      chooseList: [
        {
          foodType: ["hc"],
        },
        {
          foodType: ["sc"],
        },
        {
          foodType: ["zs"],
        },
      ],
    });
    let showAddCard = ref(true); // 控制添加卡的显示隐藏
    let showBtnBar = ref(true); // 控制操作按钮隐藏

    // 随机抽取菜品
    const onRandomFood = async () => {
      showAddCard.value = false;
      state.chooseList.forEach(async (item, i, arr) => {
        // 只抽取数组中未被锁定的
        if (!arr[i].locked) {
          arr[i] = await $menuDb.getRandomItem(item.foodType);
          arr[i].locked = false;
        }
      });
    };

    // 重置全部选择卡
    const onResetAll = () => {
      Modal.confirm({
        title: "提示",
        content: "是否确定全部重置？",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          showAddCard.value = true;
          state.chooseList.forEach((item, i, arr) => {
            arr[i] = { foodType: item.foodType };
          });
        },
      });
    };

    // 重置部分选择卡
    const onReset = () => {
      showAddCard.value = true;
      state.chooseList.forEach((item, i, arr) => {
        if (!arr[i].locked) {
          arr[i] = { foodType: item.foodType };
        }
      });
    };

    // 添加选择卡
    const onAddCard = () => {
      state.chooseList.push({ foodType: ["hc"] });
    };

    // 锁定或解锁卡
    const onLocked = (index) => {
      state.chooseList[index].locked = !state.chooseList[index].locked;
    };

    // 删除卡
    const onDelCard = (index) => {
      state.chooseList.splice(index, 1);
    };

    // 添加当天记录
    const onRecord = () => {
      Modal.confirm({
        title: "提示",
        content: "是否添加记录？",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          showBtnBar.value = false;
          let data = state.chooseList.map((item) => {
            return {
              foodId: item.foodId,
              foodName: item.foodName,
            };
          });
          $dailyLogDB.addData({ foodArr: data });
        },
      });
    };
    return {
      ...toRefs(state),
      showAddCard,
      showBtnBar,
      foodTypeEnum,
      onRandomFood,
      onResetAll,
      onReset,
      onAddCard,
      onLocked,
      onDelCard,
      onRecord,
    };
  },
});
</script>

<style lang="less">
.choose-container {
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .card-container {
    width: 790px;
    display: flex;
    flex-direction: row;
    position: relative;

    .del-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #666;
    }

    .card {
      width: 150px;
      height: 200px;
      margin: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;

      .err-message {
        margin-top: 5px;
        font-size: 12px;
        color: red;
      }
    }
  }

  .locked {
    opacity: 0.6;
  }

  .btn {
    margin: 0 10px;
  }
}
</style>
