<!--
 * @Descripttion: 新增报表目录
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-10-09 13:45:40
 * @LastEditors:  
 * @LastEditTime: 2020-10-12 13:48:12
-->
<template>
  <div class="addReport">
    <el-form ref="form"
             :rules="rules"
             :model="form"
             label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addReport',
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
      },
    }
  },
}
</script>

<style lang='less'>
</style>