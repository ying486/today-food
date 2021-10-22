<template>
  <div class="choose-container">
    注意：抽取会在含以下点亮标签的菜品中选择
    <g-checkbox-btn v-model="seasonList" :config="seasonEnum"></g-checkbox-btn>
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
          :season="item.season"
          :desc="item.desc"
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
    <div class="flexr-csa" v-show="showBtnBar">
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
  toRaw,
  getCurrentInstance,
  // computed,
} from "vue";
import { Modal, message } from "ant-design-vue";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";
import { foodTypeEnum, seasonEnum } from "./enum";
import foodCard from "../components/FoodCard.vue";
import GCheckboxBtn from "../components/g-checkbox-btn.vue";

export default defineComponent({
  components: { foodCard, GCheckboxBtn, PlusOutlined, MinusOutlined },
  async setup() {
    const { $menuDb } = getCurrentInstance().appContext.config.globalProperties; // menu数据库方法
    const { $dailyLogDB } =
      getCurrentInstance().appContext.config.globalProperties; // dailyLogDB数据库方法
    let state = reactive({
      // 抽取的卡片列表
      chooseList: [
        {
          foodType: ["hc"],
          locked: false,
        },
        {
          foodType: ["sc"],
          locked: false,
        },
        {
          foodType: ["zs"],
          locked: false,
        },
      ],
      // 卡片季节限定列表
      seasonList: ["0"],
    });
    let showAddCard = ref(true); // 控制添加卡的显示隐藏
    let showBtnBar = ref(true); // 控制操作按钮隐藏

    // 获取当前季节
    const currentSeason = () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      if ([1, 2, 3].includes(month)) {
        return ["0", "1"];
      } else if ([4, 5, 6].includes(month)) {
        return ["0", "2"];
      } else if ([7, 8, 9].includes(month)) {
        return ["0", "3"];
      } else {
        return ["0", "4"];
      }
    };
    state.seasonList = currentSeason();

    // 随机抽取菜品
    const onRandomFood = async () => {
      if (!state.chooseList.length) {
        message.info("请先添加卡片");
        return;
      }
      showAddCard.value = false;
      state.chooseList.forEach(async (item, i, arr) => {
        // 只抽取数组中未被锁定的
        if (!arr[i].locked) {
          arr[i] = await $menuDb.getRandomItem(
            toRaw(item.foodType),
            toRaw(state.seasonList)
          );
          arr[i].locked = false;
        }
      });
      console.log(state.chooseList, "chose");
      message.success("抽取成功");
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
      let data = [];
      for (let item of state.chooseList) {
        if (!item.foodId) {
          message.info("有卡片未完成抽取！");
          return;
        }
        data.push({
          foodId: item.foodId,
          foodName: item.foodName,
        });
      }
      Modal.confirm({
        title: "提示",
        content: "是否添加记录？（记录后，将会录入数据统计）",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          showBtnBar.value = false;
          $dailyLogDB.addData({ foodArr: data });
        },
      });
    };
    return {
      ...toRefs(state),
      showAddCard,
      showBtnBar,
      seasonEnum,
      foodTypeEnum,
      currentSeason,
      // func
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
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .card-container {
    width: 850px;
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
