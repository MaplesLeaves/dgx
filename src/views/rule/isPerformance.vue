<!--  -->
<template>
  <div class="">
    <tabs v-model="activeName" :tabs-list="tabsList" />
    <div class="btnNav">
      <div class="btnForm">
        <el-form ref="form" :model="form" size="mini">
          <el-form-item label="渠道类型：">
            <el-select v-model="form.select" placeholder="请选择">
              <!-- <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option> -->
              <el-option label="item.label" value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
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
    </div>
    <div class="tables">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="Date" prop="date">
          <template slot="header" slot-scope="scope">
            <div class="header">业务员入职时间</div>
          </template>
        </el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import tabs from "./tabs";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    tabs: tabs,
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",
    };
  },
  //方法集合
  methods: {
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
.header {
  background-color: #f2f8ff;
}
.btnNav {
  .btnForm {
    margin-left: 15px;
    width: 300px;
    display: inline-block;
  }
  .btnList {
    padding-right: 15px;
    float: right;
  }
}
</style>