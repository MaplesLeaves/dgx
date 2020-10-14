<!--  -->
<template>
  <div @click="pageClick">
    <tabs v-model="activeName" :tabs-list="tabsList" />

    <div class="tables">
      <tables :table-data="tabData" />
    </div>
  </div>
</template>

<script>
import tabs from "./components/tabs";
import tables from "./components/tables";
import tabData from "./data.js";
// console.log(tabData.startNodes);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    tabs: tabs,
    tables: tables,
  },
  data() {
    //这里存放数据
    return {
      activeName: "0",
      form: {},
      tabsList: [
        { label: "用户管理", name: "0" },
        { label: "配置管理", name: "1" },
        { label: "角色管理", name: "2" },
        { label: "定时任务补偿", name: "3" },
      ],
      search: "",
      tabData: tabData,
    };
  },
  //方法集合
  methods: {
    pageClick() {
      this.popoverBox = false;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang='less' scoped>
.popoverBox {
  position: absolute;
  top: 0px;
  left: 0px;
  height: auto;
  box-shadow: 0 0 10px #999999;
  border-radius: 5px;
  background-color: white;
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
.tableScopeHeader {
  padding: 0 25px;
}
</style>