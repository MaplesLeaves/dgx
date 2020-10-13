<!--
 * @Descripttion: 菜单管理
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-10-09 14:17:55
 * @LastEditors:  
 * @LastEditTime: 2020-10-12 18:24:17
-->
<template>
  <div class="crte">
    <header>
      <div class="top">
        <h3>查询条件</h3>
        <el-button size="mini"
                   @click="isSHow = !isSHow"
                   round>查询</el-button>
      </div>
      <transition name="el-zoom-in-top">
        <div class="bottom"
             v-show="isSHow">
          <span>菜单名称：</span>
          <el-input></el-input>
        </div>
      </transition>
      <div class="footerInfo">
        <el-button size="mini"
        @click="nowNum =2"
                   round>添加报表目录</el-button>
        <el-button size="mini"
        @click="nowNum = 1"
                   round>添加报表</el-button>
        <el-button size="mini"
                   round>删除</el-button>
      </div>
    </header>
    <el-container>
      <el-aside width="200px">
        <tree />
      </el-aside>
      <el-main>
        <add-catalogue v-if="nowNum === 1"/>
        <addReport v-if="nowNum === 2" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import addCatalogue from 'components/addCatalogue'
import addReport from 'components/addReport'
import tree from './tree'
export default {
  name: 'crte',
  components: {
    addCatalogue,
    addReport,
    tree,
  },
  data() {
    return {
      isSHow: false,
      nowNum: 0
    }
  },
  methods: {},
}
</script>

<style lang='less' scoped>
.crte {
  > header {
    line-height: normal;
    padding: 10px 0;
    > .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dedede;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    > .bottom {
      margin-bottom: 15px;
      display: flex;
      > span {
        width: 100px;
      }
      align-items: center;
      margin: 15px 0;
    }
    > .footerInfo {
      margin-bottom: 15px;
      border-bottom: 1px solid #dedede;
      padding-bottom: 15px;
    }
  }
}
</style>