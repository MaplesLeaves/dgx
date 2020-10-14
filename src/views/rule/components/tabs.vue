<!-- tabs -->
<template>
  <div class="tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick" closable>
      <el-tab-pane
        v-for="(item, i) in tabsList"
        :key="i"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    tabsList: {
      type: Array,
      requiret: true,
    },
  },
  data() {
    //这里存放数据
    return {
      activeName: "0",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    activeName(val) {
      this.$emit("input", val);
    },
  },
  //方法集合
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang='less' scoped>
.tabs {
  width: 100%;
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