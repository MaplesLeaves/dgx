<template>
  <div class="pageBasics">
    <tabs v-model="activeName" :tabs-list="tabsList" />
    {{ activeName }}
  </div>
</template>

<script>
import tabs from "./tabs";

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
.pageBasics {
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
  }
}
</style>
