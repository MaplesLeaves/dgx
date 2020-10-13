<!--  -->
<template>
  <div class="trees">
    <div class="tree">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
        <template slot-scope="{ node, data }">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconicon_wenjianjia"></use>
            </svg>
            <span>
              {{ node.label }}
            </span>
          </div>
        </template>
      </el-tree>
    </div>
    <div class="formVersions">
      <el-form
        ref="form"
        :model="form"
        size="mini"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="生效日期：">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期：">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
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
        <el-form-item label="基本法：">
          <el-select v-model="form.select" placeholder="请选择">
            <el-option label="item.label" value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      form: {},
    };
  },
  //方法集合
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleNodeClick(data) {
      console.log(data);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang='less' scoped>
.trees {
  padding: 15px;
  .tree {
    overflow: auto;
    height: 50vh;
  }
}
.formVersions {
  margin-top: 15px;
  width: 300px;
  /deep/ .el-form {
    .el-select {
      width: 100%;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
  }
}
//@import url(); 引入公共css类
</style>