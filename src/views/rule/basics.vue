<template>
  <div class="pageBasics">
    <tabs v-model="activeName" :tabs-list="tabsList" />
    <div class="btnList">
      <el-button type="primary" size="mini">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconicon_renwuxinzeng"></use>
        </svg>
        新增
      </el-button>
      <el-button type="primary" size="mini">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconxiugai"></use>
        </svg>
        修改
      </el-button>
      <el-button type="danger" size="mini">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconshanchu"></use>
        </svg>
        删除
      </el-button>
    </div>
    <div class="content">
      <div class="box">
        <div class="svg">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconguize"></use>
          </svg>
        </div>
        <div class="name">总公司营销基本法 (09版/A)</div>
      </div>
      <div class="box save">
        <div class="svg">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconguize"></use>
          </svg>
        </div>
        <div class="name">总公司营销基本法 (09版/A)</div>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from "./components/tabs";

export default {
  name: "basics",
  components: {
    tabs: tabs,
  },
  data() {
    return {
      activeName: "0",
      tabsList: [
        { label: "用户管理", name: "0" },
        { label: "配置管理", name: "1" },
        { label: "角色管理", name: "2" },
        { label: "定时任务补偿", name: "3" },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped lang="less">
.btnList {
  text-align: right;
  padding-right: 15px;
  .el-button {
    border-radius: 0;
  }
}
.pageBasics {
  height: 100%;
  .content {
    background: white;
    flex: 1;
    padding: 15px 0 0 15px;
    .box {
      box-sizing: border-box;
      text-align: center;
      padding: 0 10px;
      margin-bottom: 15px;
      display: inline-block;
      width: 20%;
      .svg {
        font-size: 50px;
      }
    }
    // .save {
    // background-color: rgba(64, 158, 255, 0.3);
    // }
  }
  .navLeft {
    overflow: hidden;
    margin-right: 6px;
    height: 100%;
    flex: 0 0 200px;
    background: white;
  }
}
</style>
