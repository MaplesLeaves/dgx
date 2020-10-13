<template>
  <div class="page" @click="pageClick">
    <div class="navLeft">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <el-popover
              placement="bottom"
              width="100"
              trigger="manual"
              v-model="popoverBox"
            >
              <div class="popoverBoxHeader">
                <div class="popoverBox">
                  <div class="cell select">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#iconicon_tianjia"></use>
                    </svg>
                    新建指标
                  </div>
                  <div class="cell">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#iconicon_tianjia"></use>
                    </svg>
                    新建目录
                  </div>
                  <div class="cell">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#iconicon_tianjia"></use>
                    </svg>
                    删除
                  </div>
                </div>
              </div>
              <div
                class="menaReference"
                slot="reference"
                @contextmenu.prevent="show"
              >
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </div>
            </el-popover>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">
      <div class="views">
        <router-view />
      </div>
    </div>
    <!-- <div class="popoverBox" id="popoverBox" v-show="popoverBox">
      <div class="cell select">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconicon_tianjia"></use>
        </svg>
        新建指标
      </div>
      <div class="cell">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconicon_tianjia"></use>
        </svg>
        新建目录
      </div>
      <div class="cell">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconicon_tianjia"></use>
        </svg>
        删除
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Rule",
  data() {
    return {
      popoverBox: false,
      activeName: "second",
    };
  },
  mounted() {},
  methods: {
    pageClick() {
      this.popoverBox = false;
    },
    show(e) {
      this.popoverBox = true;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped lang="less">
.menaReference {
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
}
.popoverBoxHeader {
  width: 100%;
  height: 63px;
}
.popoverBox {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: auto;
  // width: 150px;
  // box-shadow: 0 0 10px #999999;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  .cell {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: white;
    svg {
      filter: drop-shadow(#000000 80px 0);
      transform: translateX(-80px);
      overflow: hidden;
    }
  }
  .cell:hover {
    svg {
      filter: drop-shadow(white 80px 0);
      transform: translateX(-80px);
      overflow: hidden;
    }
    color: white;
    background-color: #5eaaff;
  }
}
.page {
  display: flex;
  height: 100%;
  .content {
    background: white;
    flex: 1;
  }
  .navLeft {
    overflow: hidden;
    margin-right: 6px;
    height: 100%;
    flex: 0 0 200px;
    background: white;
    /deep/ .el-submenu__title::marker {
      background-color: red;
    }
  }
}
</style>
