<!-- tabs -->
<template>
  <div class="tabs">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      @tab-remove="tabRemove"
      closable
    >
      <el-tab-pane
        v-for="item in myTabsList"
        :key="item.menuCode"
        :label="item.menuName"
        :name="item.menuCode"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tabsList: {
      type: Array,
      requiret: true,
    },
  },
  watch: {
    tabsList(val) {
      this.activeName = val[val.length - 1].menuCode;
      this.myTabsList = val;
    },
    activeName(val) {
      this.$emit("input", val);
    },
  },
  data() {
    return {
      activeName: "0",
      myTabsList: [],
    };
  },
  created() {
    this.myTabsList = this.tabsList;
  },
  methods: {
    tabRemove(name) {
      if (this.myTabsList.length > 1) {
        this.myTabsList.forEach((item, i) => {
          if (name === item.menuCode) {
            if (item.alter) {
              this.$confirm(
                "检测到未保存的内容，是否在离开页面前保存修改？",
                "确认信息",
                {
                  distinguishCancelAndClose: true,
                  confirmButtonText: "保存",
                  cancelButtonText: "不保存",
                }
              )
                .then(() => {
                  //   message: "保存修改",
                })
                .catch((action) => {
                  if (action === "cancel") {
                    //   message: "放弃保存",
                    this.myTabsList.splice(i, 1);
                  } else {
                    //   message: "继续修改",
                  }
                });
            } else {
              this.myTabsList.splice(i, 1);
            }
          }
        });
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang='less' scoped>
.tabs {
  // width: 100%;
  display: block;
  /deep/ .el-tabs {
    .el-tabs__item::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      content: "";
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      transform: perspective(0.5em) rotateX(2deg);
      transform-origin: bottom;
      border-top: 1px solid #5eaaff;
      border-right: 1px solid #5eaaff;
    }
    .el-tabs__item {
      padding: 0 20px;
      height: 30px;
      line-height: 35px;
      position: relative;
    }
    .is-active {
      color: #ffffff;
    }
    .is-active::after {
      background-color: #5eaaff;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__nav-wrap::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #5eaaff;
      z-index: 1;
    }
  }
}
</style>